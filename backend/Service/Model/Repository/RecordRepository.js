const dbConnector = require("../DatabaseConnector"); 

const protocol = require('../../Utility/Protocol');
const logger = require('../../Utility/Logger');
const jsonParser = require('../../Utility/JSONParser');
const userrepo = require('./UserRepository');
const taskrepo = require('./TaskRepository');
const dateformatter = require('../../Utility/DateFormatter')
const recorddao = require('../DaO/RecordDaO')


const pool = dbConnector.ConnectionPool;

async function getRecordByHash(recordid, hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetRecordByHash(${recordid},'${hash}')`).then((result)=>
            {
                resolve(result[result.length-2][0]);
            }).catch((e)=>
            {
                resolve(null);
            })
            res.release();
        })
    })
}

async function getAllRecords(hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetAllRecords('${hash}')`).then((result)=>
            {
                resolve(result[result.length-2]);
            }).catch((e)=>
            {
                reject(e)
            })
            res.release();
        })
    })
}

async function getUserRecords(userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserRecords('${userid}')`).then((result)=>
            {
                resolve(result[result.length-2]);
            }).catch((e)=>
            {
                reject(e)
            })
            res.release();
        })
    })
}

async function getTaskRecords(taskid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetTaskRecords('${taskid}')`).then((result)=>
            {
                resolve(result[result.length-2]);
            }).catch((e)=>
            {
                reject(e)
            })
            res.release();
        })
    })
}

async function recordByHash(recordid, hash)
{
    return new Promise((resolve, reject)=>
    {
        if(!recordid || !hash) resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
        getRecordByHash(recordid, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                resolve(result);
            }
        })
    })
}

async function getModifyRecord(id,date,comment,minute,hour,userid,taskid,modifierid){
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            console.log(date)
            res.awaitQuery(`CALL ModifyRecord('${id}','${date}','${comment}','${minute}','${hour}','${userid}','${taskid}','${modifierid}')`).then((result)=>
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

async function getDeleteRecord(recordid,userid){
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL DeleteRecord('${recordid}','${userid}')`).then((result)=>
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

async function getCreateRecord(date,comment,minute,hour,userid,taskid,modifierid,hash){
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            console.log(date)
            res.awaitQuery(`CALL CreateRecord('${date}','${comment}','${minute}','${hour}','${userid}','${taskid}','${modifierid}','${hash}')`).then((result)=>
            {
                resolve(result[result.length-2][0]);
            }).catch((e)=>
            {
                reject(e)
            })
            res.release();
        })
    })
}

async function CreateRecord(date,comment,minute,hour,userid,taskid,modifierid,hash)
{
    return new Promise((resolve, reject)=>
    {
        if(!userid || !taskid)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }     
        //check user has task
        userrepo.userTaskByHash(userid,taskid,hash).then(res1=>{
            if(!res1){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                return
            }
            let currdate = dateformatter.getCurrentDate()
            console.log(date)
            //check can edit record
            userrepo.getUserPermission('CanEditRecord',modifierid).then(res=>{
                getCreateRecord(res?date:`${currdate}`,comment?comment:"",minute?minute:0,hour?hour:0,modifierid,taskid,modifierid,hash).then((result)=>
                {
                    resolve((jsonParser.combineJSON(protocol.status(true),{"Id":result['Id']})));
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
            //create user           
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
        })
             
    })
}

async function DeleteRecord(hash,userid,recordid)
{
    return new Promise((resolve, reject)=>
    {
        if(!recordid)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }     
        //check record
        recordByHash(recordid,hash).then(res1=>{
            if(!res1){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                return 
            }
             //check user has task
            userrepo.getUserPermission('CanEditRecord',userid).then(res2=>{
                if((res2 || res1['Date'] === dateformatter.getCurrentDate()) && res1['User_idUser'] == userid){
                    getDeleteRecord(recordid,userid).then(res3=>{
                        resolve((jsonParser.combineJSON(protocol.status(true))));
                    }).catch((e)=>{
                    logger.error(e);
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
                }else{
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                    return
                }
                //check record exist
                //create user           
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

async function ModifyRecord(id,date,comment,minute,hour,userid,taskid,modifierid,hash)
{
    return new Promise((resolve, reject)=>
    {
        if(!id)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }    
        //check record exist
        console.log(id)
        recordByHash(id,hash).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                return
            }
            if(res['User_idUser'] != modifierid){
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(4)));
                return
            }
             //check can edit record
             userrepo.getUserPermission('CanEditRecord',modifierid).then(res2=>{
                 if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                    return 
                 }
                 getModifyRecord(id,date?date:`${res['Date']}`,comment?comment:res['Comment'],minute?minute:res['Minute'],hour?hour:res['Hour'],userid,taskid?taskid:res['Task_idTask'],modifierid).then((result)=>
                 {
                     resolve((jsonParser.combineJSON(protocol.status(true))));
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

async function ListAllRecords(userid,hash)
{
    return new Promise((resolve, reject)=>
    {
        userrepo.getUserPermission('IsAdmin',userid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return 
            }
            getAllRecords(hash).then((result)=>
            {
                resolve((jsonParser.combineJSON(protocol.status(true),recorddao.GetRecordListJson(result.map(element=>viewToRecord(element))))));}).catch((e)=>{
            
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
        
    })
}

async function ListUserRecords(userid,hash,callerid)
{
    return new Promise((resolve, reject)=>
    {
        userrepo.getUserPermission('IsAdmin',callerid).then(res=>{
            if(!res && userid != callerid){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return 
            }
            userrepo.userByHash(userid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return 
                }
                getUserRecords(userid).then((result)=>
                {
                    resolve((jsonParser.combineJSON(protocol.status(true),recorddao.GetRecordListJson(result.map(element=>viewToRecord(element))))));}).catch((e)=>{
                
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
        
    })
}

async function ListTaskRecords(taskid,hash,callerid)
{
    return new Promise((resolve, reject)=>
    {
        userrepo.userTaskByHash(callerid,taskid,hash).then(res=>{
            userrepo.getUserPermission('IsAdmin',callerid).then(res2=>{
                if(!res2 && !res){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                    return 
                }
                taskrepo.taskByHash(taskid,hash).then(res3=>{
                    if(!res3){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                        return 
                    }
                    getTaskRecords(taskid).then((result)=>
                    {
                        resolve((jsonParser.combineJSON(protocol.status(true),recorddao.GetRecordListJson(result.map(element=>viewToRecord(element))))));}).catch((e)=>{
                    
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

function viewToRecord(viewobj){
    return {"Record":recorddao.GetRecord(viewobj['idRecord'],viewobj['User_idUser'],viewobj['Task_idTask'],viewobj['Date'],viewobj['Hour'],viewobj['Minute'],viewobj['Comment'])};
}

module.exports={
    recordByHash:recordByHash,
    CreateRecord:CreateRecord,
    ModifyRecord:ModifyRecord,
    DeleteRecord:DeleteRecord,
    ListAllRecords:ListAllRecords,
    ListUserRecords:ListUserRecords,
    ListTaskRecords:ListTaskRecords
}