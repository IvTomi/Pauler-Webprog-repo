const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');
const userdao = require('../DaO/UserDaO');

const pool = dbConnector.ConnectionPool;

async function getAuthenticateUser(username, hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL AuthenticateUser('${username}','${hash}')`).then((result)=>{
                resolve(result);                     
            }).catch((e)=>{
                
                logger.debug(e);
                resolve(null);
            })
            res.release();   
        })
    })
}

async function authenticateUser(username,hash,password){
    return new Promise((resolve,reject)=>{
        getAuthenticateUser(username,hash).then((result)=>{
            if(result === null){
                resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                logger.debug('query result NULL');
            }else{
                try{
                    if(password === encryptor.decrypt(result[0][0]["Cypher"])){
                        resolve(jsonParser.combineJSON(protocol.status(true),JSON.parse(`{"Userid":"${result[result.length-2][0]['Id']}"}`)));
                    }else{
                        resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
                        logger.debug('password doesnt match');
                    }
                }catch(e){
                    resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    logger.debug(e);
                }
                
            }
        })
    })
}

async function loginUser(userid,isadmin,hash){
    return new Promise((resolve,reject)=>{
        if(isadmin){
            getUserPermission("IsAdmin",userid).then((result)=>{          
                if(result){
                     getUserByHash(userid,hash).then((res2)=>{
                        resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(true),
                        ViewToUser(res2))));
                     }).catch((e)=>{
                         logger.error(e)
                         resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                     })
                }else{
                    resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                } 
                
            }).catch((e)=>{
                logger.error(e);
                resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
        }else{
            getUserByHash(userid,hash).then((res2)=>{
                resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(true),
                ViewToUser(res2))));
             }).catch((e)=>{
                logger.error(e)
                resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
             })
        }
                
    })
}

function ViewToUser(viewobj){
    return {"User":userdao.GetUser(viewobj["idUser"],viewobj["Username"],viewobj["FirstName"],viewobj["LastName"],null,null,null)};
}



//USER BY HASH 
async function getUserByHash(userid, hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserByHash('${userid}','${hash}')`).then((result)=>
            {
                resolve(result[result.length-2][0]);
            }).catch((e)=>
            {
                logger.error(e)
                resolve(null);
            })
            res.release();
        })
    })
}

async function getUserPermission(permissionName, userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserPermission('${permissionName}','${userid}')`).then((result)=>
            {
                resolve(parseInt(result[result.length-2][0]['IsEnabled']) === 1? true:false)
            }).catch((e)=>
            {
                resolve(null);
            })
            res.release();
        })
    })
}

async function userByHash(userid, hash)
{
    return new Promise((resolve, reject)=>
    {
        getUserByHash(userid, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                resolve(true);
            }
        })
    })
}

module.exports={
    authenticateUser:authenticateUser,
    userByHash:userByHash,
    loginUser:loginUser
}