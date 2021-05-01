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
const recordrepo = require("./Model/Repository/RecordRepository");
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
            logger.debug(result);
            if(result['Status']=='Success')
            {
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

router.get("/test",(req,res)=>
{
    teamrepo.CreateNewTeam(6,req.headers['hash'],"Valami","Cucc",[]).then(result=>{
        logger.debug(result);
    })

})

//valós register végpont
router.post("/register",(req,res)=>{
    registerSuperUser(req.body['username'],req.body['password'],req.body['email'],req.body['company']).then((result)=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })
})

//valós login végpont
router.post("/login",(req,res)=>{
    userrepo.loginUser(req.userid,false,req.headers["hash"]).then((result)=>{
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
    teamrepo.ListTeams(req.headers['hash']).then(result=>{
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

    teamrepo.ModifyTeamMemberTag(req.userid,req.headers['hash'],req.body['MemberId'],req.body['Tag'],req.body['TeamId']).then(result=>{
        res.json(result);
    }).catch((e)=>{
        logger.error(e)
        res.json(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
    })

})

//valós delete team végpont
router.post("/team/add/user",(req,res)=>
{

    teamrepo.AddMemberToTeam(req.userid,req.headers['hash'],req.body['TeamId'],req.body['MemberId'],req.body['Tag']).then(result=>{
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






function checkIdentification(route){
    return nonIdentifyRoutes.includes(route);
}

module.exports = router;