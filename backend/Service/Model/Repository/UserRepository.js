const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');
const userdao = require('../DaO/UserDaO');

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
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
                logger.debug('query result NULL');
                logger.debug(result);
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

//GET USERS (nem userobject-et ad vissza)
async function getUsers(hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUsers('${hash}')`).then((result)=>
            {
                resolve(result[result.length-2]);
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
                logger.debug(JSON.stringify(result));
                resolve((jsonParser.combineJSON(protocol.status(true),ViewToUser(result))));
                //resolve(result);
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

//MODIFY USER (az eredmény nem a user obj még) [probléma sql-ben CSAK jelszóváltoztatás VAGY CSAK first/last name változtatás]
async function modifyUser(targetuserid, password, firstname, lastname, idmodifiedBy)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL ModifyUser(${targetuserid},'${password}','${firstname}','${lastname}',${idmodifiedBy})`).then((result)=>
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
async function changeUser(targetuserid, password, firstname, lastname, idmodifiedBy)
{
    return new Promise((resolve, reject)=>
    {
        if(!targetuserid)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
        }
        modifyUser(targetuserid, password, firstname, lastname, idmodifiedBy).then((result)=>
        {
            if(result==null)
            {
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
            }
            else
            {
                logger.debug(JSON.stringify(result));
                resolve(jsonParser.combineJSON(protocol.status(true),result));
            }
        })
    })
}

//REMOVE USER ("user not exist" hibát nem ad vissza)
async function deleteUser(userid, idlastmodified)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL DeleteUser(${userid},${idlastmodified})`).then((result)=>
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
async function removeUser(userid, idlastmodified)
{
    return new Promise((resolve, reject)=>
    {
        if(!userid || !idlastmodified)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
        }
        deleteUser(userid, idlastmodified).then((result)=>
        {
            if(result==null)
            {
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
            }
            else
            {
                logger.debug(JSON.stringify(result));
                resolve(jsonParser.combineJSON(protocol.status(true)));
            }
        })
    })
}

//CREATE USER (nem user objectet ad vissza)
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
        if(!username || !password || !hash || !userid)
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
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
            }
            else
            {
                logger.debug(JSON.stringify(result));
                resolve(protocol.status(true));
            }
        })
    })
}

//CREATE CONTACT (Csak id-t ad vissza, nem contact obj-ot)
async function createContact(typename, value, description, userid, ispublic, hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL CreateContact('${typename}','${value}','${description}',${userid},${ispublic},'${hash}')`).then((result)=>
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
async function newContact(typename, value, description, userid, ispublic, hash)
{
    return new Promise((resolve, reject)=>
    {
        if(!description) description="";
        createContact(typename, value, description, userid, ispublic, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
            }
            else
            {
                logger.debug(JSON.stringify(result));
                resolve(jsonParser.combineJSON(protocol.status(true),result[0][0]));
            }
        })
    })
}

//MODIFY CONTACT (Csak id-t, nem contact obj-ot ad még vissza) (contact not exist eset nincs megírva)
async function modifyContact(contactId, value, description, ispublic, userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL ModifyContact(${contactId},'${value}','${description}',${ispublic},${userid})`).then((result)=>
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
async function changeContact(contactId, value, description, ispublic, userid)
{
    return new Promise((resolve, reject)=>
    {
        if(!description || !value || !ispublic)
        {
            description="";
            value="";
            ispublic=true;
        }
        modifyContact(contactId, value, description, ispublic, userid).then((result)=>
        {
            if(result==null)
            {
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
            }
            else
            {
                //ide egy if a contact not existre
                logger.debug(JSON.stringify(result));
                resolve(jsonParser.combineJSON(protocol.status(true),result));
            }
        })
    })
}

//DELETE CONTACT (a "contactId nem létezik" hiba nincs megírva)
async function deleteContact(contactId, userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL DeleteContact(${contactId},${userid})`).then((result)=>
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
async function contactDeleter(contactId, userid)
{
    return new Promise((resolve, reject)=>
    {
        deleteContact(contactId,userid).then((result)=>
        {
            if(result==null)
            {
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
            }
            else
            {
                //ide egy if a contact not existre
                logger.debug(JSON.stringify(result));
                resolve(jsonParser.combineJSON(protocol.status(true)));
            }
        })
    })
}



module.exports={
    authenticateUser:authenticateUser,
    userByHash:userByHash,
    loginUser:loginUser,
    users:users,
    userContacts:userContacts,
    userPermissions:userPermissions,
    userCreator:userCreator,
    newContact:newContact,
    changeContact:changeContact,
    contactDeleter:contactDeleter,
    removeUser:removeUser,
    changeUser:changeUser,
}