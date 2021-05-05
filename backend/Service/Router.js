const express = require('express');
const router = new express.Router();
const logger = require('./Utility/Logger');
const bodyParser = require('body-parser');
const configurationManager = require('./Utility/ConfigurationManager');
const userrepo = require("./Model/Repository/UserRepository");
const protocol = require('./Utility/Protocol');
const jsonParser = require('./Utility/JSONParser');
const superuserrepo = require("./Model/Repository/SuperUserRepository");
const teamrepo = require('./Model/Repository/TeamRepository')
const taskrepo = require('./Model/Repository/TaskRepository')
const recordrepo = require('./Model/Repository/RecordRepository')
const { registerSuperUser } = require('./Model/Repository/SuperUserRepository');


const nonIdentifyRoutes = configurationManager.nonidentifiedRoutes();

router.use(bodyParser.json());

//Middleware logging
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, username,password,hash");
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    next();
});

router.use(function(err, req, res, next) {
    // ⚙️ our function to catch errors from body-parser
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
      // do your own thing here 👍
      res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(100))));
    } else next();
  });

router.use((req,res,next)=>{
    logger.info('Request from:'+req.ip+' '+req.protocol+' '+req.originalUrl);
    //getnonidentifiedroutes tömbböt átnéz ha benne akkor végrehajt (nem reg, log)
    if(nonIdentifyRoutes.includes(req.originalUrl))
    {
        next();
    }
    else
    {
        userrepo.authenticateUser(req.headers['username'],req.headers['hash'],req.headers['password']).then(result=>{
            if(result['Status']==='Success') 
            {
                logger.debug(result);
                req.userid = result['Userid'];
                next();
            }
            else
            {
                res.json(result);
            }
        }).catch((err)=>{
            logger.error(err);
            res.json(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
        })
    }
    
});
//teszt végpont

router.post("/test",(req,res)=>
{
    testrepo.test().then(resu=>{
        res.json({"oh":resu})
    })

})

//valós register végpont
router.post("/register",(req,res)=>{
    console.log(req.body)
    registerSuperUser(req.body['Username'],req.body['Password'],req.body['Email'],req.body['Company']).then((result)=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })
})

//valós login végpont
router.post("/login",(req,res)=>{
    userrepo.loginUser(req.userid,req.body['Isadmin'],req.headers["hash"]).then((result)=>{
        res.json(result)
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })
})

//valós create team végpont
router.post("/team/create",(req,res)=>
{
    teamrepo.CreateNewTeam(req.userid,req.headers['hash'],req.body['Name'],req.body['Description']? req.body['Description']:"",req.body['TeamMembers']? req.body['TeamMembers']:[]).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

//valós teams/list végpont
router.post("/team/list",(req,res)=>
{
    teamrepo.ListTeams(req.headers['hash'],req.userid).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})
//valós teammodify végpont
router.post("/team/modify",(req,res)=>
{

    teamrepo.MoidifyTeam(req.userid,req.headers['hash'],req.body['TeamId'],req.body['Name'],req.body['Description']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})
//valós delete team végpont
router.post("/team/delete",(req,res)=>
{

    teamrepo.DeleteTeam(req.userid,req.headers['hash'],req.body['TeamId']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

//valós delete team végpont
router.post("/team/modify/tag",(req,res)=>
{

    teamrepo.ModifyTeamMemberTag(req.userid,req.headers['hash'],req.body['Memberid'],req.body['Tag'],req.body['TeamId']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

//valós delete team végpont
router.post("/team/add/user",(req,res)=>
{

    teamrepo.AddMemberToTeam(req.userid,req.headers['hash'],req.body['Teamid'],req.body['Memberid'],req.body['Tag']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

//valós delete team végpont
router.post("/user/add/task",(req,res)=>
{

    taskrepo.AddTaskToUser(req.body['Userid'],req.body['Taskid'],req.userid,req.headers['hash']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})


router.post("/team/add/task",(req,res)=>
{

    taskrepo.AddTaskToTeam(req.body['Taskid'],req.body['Teamid'],req.userid,req.headers['hash']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

router.post("/team/remove/task",(req,res)=>
{

    taskrepo.RemoveTaskFromTeam(req.userid,req.headers['hash'],req.body['Taskid'],req.body['Teamid']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

router.post("/team/remove/user",(req,res)=>
{

    teamrepo.RemoveMemberFromTeam(req.userid,req.headers['hash'],req.body['TeamId'],req.body['MemberId']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

router.post("/team/get/tasks",(req,res)=>
{

    taskrepo.ListTeamTasks(req.headers['hash'],req.body['Teamid'],req.userid).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

//tesztelni!
router.post("/user/list",(req,res)=>
{
    userrepo.ListUsers(req.userid,req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

//tesztelni!
router.post("/user/create",(req,res)=>
{
    userrepo.CreateUser(req.body['Username'], req.body['Password'], req.body['Firstname'], req.body['Lastname'], req.headers['hash'], req.userid, req.body['Allprivileges']).then((result)=>
    {
        res.json(result);
    })
})

//teszt!
router.post("/user/remove",(req,res)=>
{
    userrepo.DeleteUser(req.body['Userid'],req.userid,req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/task/list",(req,res)=>
{
    taskrepo.ListTasks(req.userid,req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/task/remove",(req,res)=>
{
    taskrepo.DeleteTask(req.body['Taskid'],req.userid,req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/user/remove/task",(req,res)=>
{
    taskrepo.RemoveTaskFromUser(req.userid,req.headers['hash'],req.body["Taskid"],req.body['Userid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/user/get/contacts",(req,res)=>
{
    userrepo.ListUserContacts(req.headers['hash'],req.body['Userid'],req.userid).then(result=>{
        res.json(result)
    })
})

router.post("/user/get/tasks",(req,res)=>
{
    taskrepo.ListUserTasks(req.headers['hash'],req.body['Userid'],req.userid).then(result=>{
        res.json(result)
    })
})

router.post("/user/get/permissions", (req, res)=>
{
    userrepo.ListUserPermissions(req.body['Userid'],req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/team/get/users", (req, res)=>
{
    teamrepo.ListTeamUsers(req.headers['hash'],req.userid,req.body['Teamid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/user/get/records", (req, res)=>
{
    recordrepo.ListUserRecords(req.body['Userid'],req.headers['hash'],req.userid).then((result)=>
    {
        res.json(result);
    })
})

router.post("/user/permission/modify",(req,res)=>
{
    userrepo.ModifyUserPermission(req.userid,req.headers['hash'],req.body['Permissionname'],req.body['Isenabled'],req.body['Userid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/user/modify",(req,res)=>
{
    userrepo.ModifyUser(req.userid,req.headers['hash'],req.body['Userid'],req.body['Password'],req.body['Firstname'],req.body['Lastname']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/user/contact/create",(req,res)=>
{
    userrepo.AddContactToUser(req.userid,req.headers['hash'],req.body['Typename'],req.body['Value'],req.body['Comment'],req.body['Ispublic'],req.body['Userid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/user/contact/remove",(req,res)=>
{
    userrepo.RemoveContactFromUser(req.userid,req.headers['hash'],req.body['Contactid'],req.body['Userid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/task/create",(req,res)=>
{
    taskrepo.CreateTask(req.userid,req.headers['hash'],req.body['Taskname'],req.body['Description'],req.body['Deadline']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/task/get/records",(req,res)=>
{
    recordrepo.ListTaskRecords(req.body['Taskid'],req.headers['hash'],req.userid).then((result)=>
    {
        res.json(result);
    })
})

router.post("/task/get/users",(req,res)=>
{
    taskrepo.ListTaskUsers(req.headers['hash'],req.userid,req.body['Taskid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/task/modify",(req,res)=>
{
    taskrepo.ModifyTask(req.userid,req.headers['hash'],req.body['Taskname'],req.body['Description'],req.body['Deadline'],req.body['Taskid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/record/create",(req,res)=>
{
    recordrepo.CreateRecord(req.body['Date'],req.body['Comment'],req.body['Minute'],req.body['Hour'],req.body['Userid'],req.body['Taskid'],req.userid,req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/record/modify",(req,res)=>
{
    recordrepo.ModifyRecord(req.body['Recordid'],req.body['Date'],req.body['Comment'],req.body['Minute'],req.body['Hour'],req.body['Userid'],req.body['Taskid'],req.userid,req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/record/remove",(req,res)=>
{
    recordrepo.DeleteRecord(req.headers['hash'],req.userid,req.body['Recordid']).then((result)=>
    {
        res.json(result);
    })
})

router.post("/record/list",(req,res)=>
{
    recordrepo.ListAllRecords(req.userid,req.headers['hash']).then((result)=>
    {
        res.json(result);
    })
})

function checkIdentification(route){
    return nonIdentifyRoutes.includes(route);
}

module.exports = router;