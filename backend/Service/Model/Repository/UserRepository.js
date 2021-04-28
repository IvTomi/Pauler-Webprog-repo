const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');

const pool = dbConnector.ConnectionPool;

//USER AUTHENTICATION
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
                        resolve(jsonParser.combineJSON(protocol.status(true),`{"Userid":"${result[result.length-2][0]['Id']}"}`));
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

//GET USER BY HASH 
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
                logger.debug(JSON.stringify(result));
                resolve(true);
            }
        })
    })
}

//GET USERS
async function getUsers(hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUsers('${hash}')`).then((result)=>
            {
                resolve(result);
            }).catch((e)=>
            {
                resolve(null);
            })
            res.release();
        })
    })
}
async function users(hash)
{
    return new Promise((resolve, reject)=>
    {
        getUsers(hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                logger.debug(JSON.stringify(result[0]));
                resolve(result[0]);
            }
        })
    })
}

//GET USER CONTACTS (az eredmény am üres nincs adat db-ben hozzá még)
async function getUserContacts(hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserContacts('${hash}')`).then((result)=>
            {
                resolve(result);
            }).catch((e)=>
            {
                resolve(null);
            })
            res.release();
        })
    })
}
async function userContacts(hash)
{
    return new Promise((resolve, reject)=>
    {
        getUserContacts(hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                logger.debug(JSON.stringify(result[0]));
                resolve(true);
            }
        })
    })
}

//GET USER PERMISSIONS
async function getUserPermissions(userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserPermissions('${userid}')`).then((result)=>
            {
                resolve(result);
            }).catch((e)=>
            {
                resolve(null);
            })
            res.release();
        })
    })
}
async function userPermissions(userid)
{
    return new Promise((resolve, reject)=>
    {
        getUserPermissions(userid).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                logger.debug(JSON.stringify(result[0]));
                resolve(result[0]);
            }
        })
    })
}

//MODIFY USER

//CREATE USER
async function createUser(username, password, firstname, lastname, hash, userid, allprivileges)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL CreateUser('${username}','${password}','${firstname}','${lastname}','${hash}',${userid},${allprivileges})`).then((result)=>
            {
                resolve(result);
            }).catch((e)=>
            {
                resolve(null);
            })
            res.release();
        })
    })
}
async function userCreator(username, password, firstname, lastname, hash, userid, allprivileges)
{
    return new Promise((resolve, reject)=>
    {
        if(!username || !password || !hash || !userid || !allprivileges)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
        }
        else if(!firstname || !lastname)
        {
            firstname = "";
            lastname = "";
        }
        createUser(username, encrypt(password), firstname, lastname, hash, userid, allprivileges).then((result)=>
        {
            if(result==null)
            {
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(4)));
            }
            else
            {
                logger.debug(JSON.stringify(result));
                resolve(true);
            }
        })
    })
}

module.exports={
    authenticateUser:authenticateUser,
    userByHash:userByHash,
    users:users,
    userContacts:userContacts,
    userPermissions:userPermissions,
    userCreator:userCreator,
}