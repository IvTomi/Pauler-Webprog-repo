const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');

const jsonParser = require('../../Utility/JSONParser');
const userrepo = require('./UserRepository');
const teamrepo = require('./TeamRepository');
const taskdao = require('../DaO/TaskDaO');

const pool = dbConnector.ConnectionPool;

async function getAddTaskToUser(taskid, userid, modifierid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL AddTaskToUser('${taskid}','${userid}','${modifierid}')`).then((result)=>
            {
                resolve(true);
            }).catch((e)=>
            {

                if(e['sqlState'] === '45000'){
                    resolve(false);
                }else{
                   reject(e)
                }
                
            })
            res.release();
        })
    })
}

async function getDeleteTask(taskid, userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL DeleteTask('${taskid}','${userid}')`).then((result)=>
            {
                resolve(true);
            }).catch((e)=>
            {
                   reject(e)              
            })
            res.release();
        })
    })
}

async function getAddTaskToTeam(taskid, teamid, modifierid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL AddTaskToTeam('${taskid}','${teamid}','${modifierid}')`).then((result)=>
            {
                resolve(true);
            }).catch((e)=>
            {

                if(e['sqlState'] === '45000'){
                    resolve(false);
                }else{
                   reject(e)
                }
                
            })
            res.release();
        })
    })
}

async function getRemoveTaskFromUser(taskid, userid, modifierid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL RemoveTaskFromUser('${userid}','${taskid}','${modifierid}')`).then((result)=>
            {
                resolve(true)
            }).catch((e)=>
            {

                reject(e)
                
            })
            res.release();
        })
    })
}

async function getRemoveTaskFromTeam(taskid, teamid, modifierid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL RemoveTaskFromTeam('${teamid}','${taskid}','${modifierid}')`).then((result)=>
            {
                resolve(true)
            }).catch((e)=>
            {

                reject(e)
                
            })
            res.release();
        })
    })
}

async function getUserTasks(userid){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetUserTasks('${userid}')`).then((result)=>{
                resolve(result[result.length-2]);                     
            }).catch((e)=>{
                
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
            res.release();   
        })
    })
}

async function getTasks(hash){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetAllTasks('${hash}')`).then((result)=>{
                resolve(result[result.length-2]);                     
            }).catch((e)=>{
                
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
            res.release();   
        })
    })
}

async function getTeamTasks(teamid){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTeamTasks('${teamid}')`).then((result)=>{
                resolve(result[result.length-2]);                     
            }).catch((e)=>{
                reject(e)
            })
            res.release();   
        })
    })
}

async function getTaskByHash(id, hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTaskByHash('${id}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
               
                if(e['sqlState'] === '45000'){
                    resolve(null);
                }else{
                   reject(e)
                }
            })
            res.release();   
        })
    })
}

async function taskByHash(id, hash){   
    return new Promise((resolve,reject)=>{
        getTaskByHash(id, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                resolve(true);
            }
        }).catch((e)=>{
            reject(e)
        })
    })
}

async function getCreateTask(taskname,description,deadline,userid,hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL CreateTask('${taskname}','${description}','${deadline}','${userid}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
                
                reject(e)
            })
            res.release();   
        })
    })
}

async function getModifyTask(taskname,description,deadline,taskid,userid){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL ModifyTask('${taskid}','${taskname}','${description}',${deadline},'${userid}')`).then((result)=>{
                resolve(true)                    
            }).catch((e)=>{
                
                reject(e)
            })
            res.release();   
        })
    })
}

async function CreateTask(userid,hash, taskname,description,deadline)
{
    return new Promise((resolve, reject)=>
    {
        if(!taskname)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check permission
        userrepo.getUserPermission("CanEditTask",userid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //create user
            getCreateTask(taskname,description?description:"",deadline?deadline:null,userid,hash).then((result)=>
            {
                if(!result){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }else{
                    resolve((jsonParser.combineJSON(protocol.status(true),{"Id":result['Id']})));
                }
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
        })
        
    })
}

async function AddTaskToUser(userid,taskid,modifierid,hash){
    return new Promise((resolve, reject)=>
    {     
        if(!userid || !taskid )
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check permission   
       
        userrepo.getUserPermission("CanEditUser",modifierid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check target user exists
            userrepo.userByHash(userid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return 
                }
                //check task exists
                taskByHash(taskid,hash).then(res=>{
                    if(!res){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                        return 
                    }
                    //add task to user
                    getAddTaskToUser(taskid,userid,modifierid).then(res2=>{
                        if(!res2){
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                            return 
                        }
                        resolve((jsonParser.combineJSON(protocol.status(true))));
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                        return
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                        return
                    })
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
    })

}

async function ListUserTasks(hash,userid,callerid)
{
    return new Promise((resolve, reject)=>
    {
        if(!userid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(3))));
            return
        }
        //get by permission
        userrepo.getUserPermission("IsAdmin",callerid).then(res=>{
            console.log(res)
            if(!res && userid!=callerid){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check user exists
            userrepo.userByHash(userid,hash).then(res=>{
                if(!res){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                getUserTasks(userid).then(res2=>{
                    resolve((jsonParser.combineJSON(protocol.status(true),taskdao.GetTaskListJson(res2.map(element=>viewToTask(element))))));
                }).catch((e)=>{
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                logger.error(e)
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
            
        }).catch((e)=>{
            logger.error(e)
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
    })
}

async function ListTasks(userid,hash)
{
    return new Promise((resolve, reject)=>
    {
        userrepo.getUserPermission("IsAdmin",userid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            getTasks(hash).then(res2=>{
                resolve((jsonParser.combineJSON(protocol.status(true),taskdao.GetTaskListJson(res2.map(element=>viewToTask(element))))));
            }).catch((e)=>{
                logger.error(e)
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        }).catch((e)=>{
            logger.error(e)
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
        
    })
}

async function ListTeamTasks(hash,teamid,callerid)
{
    return new Promise((resolve, reject)=>
    {
        if(!teamid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(3))));
            return
        }
        //get by permission
        userrepo.getUserPermission("IsAdmin",callerid).then(async res=>{
            console.log(res)
            //let isinteam = 
            if(!res && !(await teamMemberByHash(callerid,hash))){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check team exists
            teamrepo.teamByHash(teamid,hash).then(res=>{
                if(!res){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                getTeamTasks(teamid).then(res2=>{
                    resolve((jsonParser.combineJSON(protocol.status(true),taskdao.GetTaskListJson(res2.map(element=>viewToTask(element))))));
                }).catch((e)=>{
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                logger.error(e)
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
            
        }).catch((e)=>{
            logger.error(e)
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
    })
}

async function AddTaskToTeam(taskid,teamid,modifierid,hash){
    return new Promise((resolve, reject)=>
    {     
        if(!taskid || !teamid )
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check permission   
       
        userrepo.getUserPermission("CanEditTeam",modifierid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check target user exists
            taskByHash(taskid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return 
                }
                //check task exists
                teamrepo.teamByHash(teamid,hash).then(res=>{
                    if(!res){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                        return 
                    }
                    //add task to user
                    getAddTaskToTeam(taskid,teamid,modifierid).then(res2=>{
                        if(!res2){
                            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                            return 
                        }
                        resolve((jsonParser.combineJSON(protocol.status(true))));
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                        return
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                        return
                    })
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
    })

}

async function RemoveTaskFromUser(userid,hash,taskid,targetid){
    return new Promise((resolve,reject)=>{
        if(!taskid || !targetid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
        }
        //check permission
        userrepo.getUserPermission("CanEditUser",userid).then(result=>{
            if(!result){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check user
            userrepo.userByHash(targetid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //check contact exist of user
                userrepo.userTaskByHash(targetid,taskid,hash).then(res3=>{
                    if(!res3){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1)))); 
                        return
                    }
                    //remove contact
                    getRemoveTaskFromUser(taskid,targetid,userid).then(res=>{
                        resolve(jsonParser.combineJSON(protocol.status(true)));
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                        return
                    })
                    
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                    return
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                return
            })
            //check team exists
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
            return     
        })
    })
}

async function RemoveTaskFromTeam(userid,hash,taskid,teamid){
    return new Promise((resolve,reject)=>{
        if(!teamid || !taskid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
        }
        //check permission
        userrepo.getUserPermission("CanEditUser",userid).then(result=>{
            if(!result){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check team
            teamrepo.teamByHash(teamid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //check contact exist of user
                teamrepo.teamTaskByHash(teamid,taskid,hash).then(res3=>{
                    if(!res3){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1)))); 
                        return
                    }
                    //remove contact
                    getRemoveTaskFromTeam(teamid,taskid,userid).then(res=>{
                        resolve(jsonParser.combineJSON(protocol.status(true)));
                    }).catch((e)=>{
                        logger.error(e);
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                        return
                    })
                    
                }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                    return
                })
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
                return
            })
            //check team exists
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));  
            return     
        })
    })
}

async function ModifyTask(userid,hash,taskname, description, deadline, taskid)
{
    return new Promise((resolve, reject)=>
    {
        if(!taskid)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check permission
        userrepo.getUserPermission("CanEditTask",userid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check task exists
            getTaskByHash(taskid,hash).then(res=>{
                if(!res){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //modify task
                getModifyTask(taskname?taskname:res['TaskName'],description?description:res['Description'],deadline?`'${deadline}'`:`'${res['Deadline']}'`,taskid,userid).then(res2=>{
                    resolve(jsonParser.combineJSON(protocol.status(true)));
                }).catch((e)=>{
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
                
            }).catch((e)=>{
                logger.error(e)
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                return
            })
        }).catch((e)=>{
            logger.error(e)
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
        
    })
}

async function DeleteTask(taskid, userid,hash)
{
    return new Promise((resolve, reject)=>
    {
        if(!taskid)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return;
        }
        //check permission
        userrepo.getUserPermission("CanEditTask",userid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check id exists
            taskByHash(taskid,hash).then(res=>{
                if(!res){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //delete user
                getDeleteTask(taskid, userid).then((result)=>
                {
                        resolve(jsonParser.combineJSON(protocol.status(true)));
                }).catch((e)=>{
                   
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }).catch((e)=>{
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
            })
        }).catch((e)=>{
            logger.error(e)
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })       
        
    })
}

function viewToTask(viewobj){
    return {"Task":taskdao.GetTask(viewobj["Task_idTask"]?viewobj["Task_idTask"]:viewobj['idTask'],viewobj["TaskName"],viewobj["Description"],viewobj["StatusName"],viewobj["Deadline"])};
}

module.exports={
    CreateTask:CreateTask,
    ModifyTask:ModifyTask,
    taskByHash:taskByHash,
    AddTaskToUser:AddTaskToUser,
    RemoveTaskFromUser:RemoveTaskFromUser,
    AddTaskToTeam:AddTaskToTeam,
    RemoveTaskFromTeam:RemoveTaskFromTeam,
    ListUserTasks:ListUserTasks,
    ListTeamTasks:ListTeamTasks,
    ListTasks:ListTasks,
    DeleteTask:DeleteTask

}