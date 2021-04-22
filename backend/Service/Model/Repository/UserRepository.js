const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');

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
                        resolve(JSON(protocol.status(true)));
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

//USER BY HASH 
async function getUserByHash(userid, hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserByHash('${userid}','${hash}')`).then((result)=>
            {
                resolve(result);
            }).catch((e)=>
            {
                logger.debug(`Userid érték: ${userid} A baj: ${e}`);
                resolve(null);
            })
            res.release();
        })
    })
}

//A userid az "undefined"
async function userByHash(userid, hash)
{
    return new Promise((resolve, reject)=>
    {
        getUserByHash(userid, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(jsonParser.combineJSON(protocol.status(false), protocol.error(1)));
                logger.debug('query result NULL');
            }
            else
            {
                try
                {
                    resolve(JSON(protocol.status(true)));
                }
                catch(e)
                {
                    resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
                    logger.debug(e);
                }
            }
        })
    })
}

module.exports={
    authenticateUser:authenticateUser,
    userByHash:userByHash
}