const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');
const userdao = require('../DaO/UserDaO');
const contactrepo = require('./ContactRepository');
const contactdao = require('../DaO/ContactDaO');
const permissiondao = require('../DaO/PermissionDaO');


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
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
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
                        resolve((jsonParser.combineJSON(protocol.status(true),
                        ViewToUser(res2))));
                     }).catch((e)=>{
                         logger.error(e)
                         resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                     })
                }else{
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                } 
                
            }).catch((e)=>{
                logger.error(e);
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
        }else{
            getUserByHash(userid,hash).then((res2)=>{
                resolve((jsonParser.combineJSON(protocol.status(true),
                ViewToUser(res2))));
             }).catch((e)=>{
                logger.error(e)
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
             })
        }
                
    })
}

function ViewToUser(viewobj,tasklist,contactslist,permissionlist){
    return {"User":userdao.GetUser(viewobj["idUser"]?viewobj["idUser"]:viewobj["User_idUser"],viewobj["Username"],viewobj["FirstName"],viewobj["LastName"],contactslist,tasklist,permissionlist)};
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

async function getUserPermission(permissionName, userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserPermission('${permissionName}','${userid}')`).then((result)=>
            {
                console.log(result[result.length-2][0]);
                resolve(parseInt(result[result.length-2][0]['IsEnabled']) === 1? true:false)
            }).catch((e)=>
            {
                reject(e)
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
        }).catch((e)=>{
            reject(e)
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
async function ListUsers(userid,hash)
{
    return new Promise((resolve, reject)=>
    {
        getUsers(hash).then((result)=>
        {
            resolve((jsonParser.combineJSON(protocol.status(true),userdao.GetUserListJson(result.map(element=>ViewToUser(element,null,null,null))))));
        }).catch((e)=>{
            logger.error(e);
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
        })
    })
}

//GET USER CONTACTS (az eredmény am üres nincs adat db-ben hozzá még)
async function getUserContacts(hash,userid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserContacts('${hash}','${userid}')`).then((result)=>
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
async function ListUserContacts(hash,userid,callerid)
{
    return new Promise((resolve, reject)=>
    {
        
        //get by permission
        getUserPermission("IsAdmin",callerid).then(res=>{
            console.log(res)
            if(!res && callerid != userid){
                getUserContacts(hash,userid).then(res2=>{
                    resolve((jsonParser.combineJSON(protocol.status(true),contactdao.GetContactListJson(res2.map(element=>contactrepo.viewToContact(element)).filter(x=>x['Contact']['ispublic'])))));
                }).catch((e)=>{
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }else{
                getUserContacts(hash,userid).then(res2=>{
                    resolve((jsonParser.combineJSON(protocol.status(true),contactdao.GetContactListJson(res2.map(element=>contactrepo.viewToContact(element))))));
                }).catch((e)=>{
                    logger.error(e)
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
                    return
                })
            }
        }).catch((e)=>{
            logger.error(e)
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            return
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
                resolve(result[result.length-2])             
            }).catch((e)=>
            {
                resolve(null);
            })
            res.release();
        })
    })
}
async function ListUserPermissions(userid,hash)
{
    return new Promise((resolve, reject)=>
    {
        //check user exist
        userByHash(userid,hash).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                return;
            }
            getUserPermissions(userid).then(res2=>{
                resolve((jsonParser.combineJSON(protocol.status(true),permissiondao.GetPermissionListJson(res2.map(element=>ViewToPermission(element))))));
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

async function getUpdateUserPermission(userid,permissionname,isenabled,modifierid){
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL UpdateUserPermission(${userid},'${permissionname}','${isenabled}','${modifierid}')`).then((result)=>
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

async function ModifyUserPermission(userid,hash,permissionname,isenabled,targetid){
    return new Promise((resolve, reject)=>
    {
        if(!permissionname || isenabled===null || !targetid){
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check can edit permission
        getUserPermission('CanEditUser',userid).then(res=>{
            if(!res){
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(4)));
                return
            }
            //check if permissionname valid
            //check target user exists
            userByHash(targetid,hash).then(res2=>{
                if(!res2){
                    resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
                    return
                }
                //update user permission
                getUpdateUserPermission(targetid,permissionname,isenabled?'001':'000',userid).then(res3=>{
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

//MODIFY USER (az eredmény nem a user obj még) [probléma sql-ben CSAK jelszóváltoztatás VAGY CSAK first/last name változtatás]
async function getModifyUser(targetuserid, password, firstname, lastname, idmodifiedBy)
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
async function ModifyUser(userid,hash,targetuserid, password, firstname, lastname)
{
    return new Promise((resolve, reject)=>
    {
        if(!targetuserid)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check permission
        getUserPermission("CanEditUser",userid).then(res=>{
            if(!res && userid != targetuserid){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check user exists
            getUserByHash(userid,hash).then(res=>{
                if(!res){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //modify user
                getModifyUser(targetuserid,password?encrypt(password):"",firstname?firstname:res['FirstName'],lastname?lastname:res['LastName'],userid).then(res2=>{
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

//REMOVE USER ("user not exist" hibát nem ad vissza)
async function getDeleteUser(userid, idlastmodified)
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
                reject(e);
            })
            res.release();
        })
    })
}
async function DeleteUser(userid, idlastmodified,hash)
{
    return new Promise((resolve, reject)=>
    {
        if(!userid)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return;
        }
        //check permission
        getUserPermission("CanEditUser",idlastmodified).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check id exists
            userByHash(userid,hash).then(res=>{
                if(!res){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //delete user
                getDeleteUser(userid, idlastmodified).then((result)=>
                {
                        logger.debug((result));
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

//CREATE USER (nem user objectet ad vissza)
async function getCreateUser(username, password, firstname, lastname, hash, userid, allprivileges)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL CreateUser('${username}','${password}','${firstname}','${lastname}','${hash}',${userid},${allprivileges})`).then((result)=>
            {
                resolve(result[result.length-2][0]);
            }).catch((e)=>
            {
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

async function getAddContactToUser(contactid, userid, modifierid,hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            console.log(contactid)
            res.awaitQuery(`CALL AddContactToUser('${userid}','${contactid}','${modifierid}')`).then((result)=>
            {
                contactrepo.getContactByHash(contactid,hash).then(res2=>{                   
                    resolve(res2);
                }).catch((e)=>{
                    if(e['sqlState'] === '45000'){
                        resolve(null);
                    }else{
                       reject(e)
                    }
                })
            }).catch((e)=>
            {
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

async function getUserContactsByHash(userid,contactid,hash){
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserContactsByHash('${userid}','${contactid}','${hash}')`).then((result)=>
            {
                resolve(result[result.length-2][0])
            }).catch((e)=>
            {

                reject(e)
                
            })
            res.release();
        })
    })
}

async function getUserTaskByHash(userid,taskid,hash){
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetUserTasksByHash('${userid}','${taskid}','${hash}')`).then((result)=>
            {
                resolve(result[result.length-2][0])
            }).catch((e)=>
            {

                reject(e)
                
            })
            res.release();
        })
    })
}

async function userContactByHash(userid,contactid,hash){
    return new Promise((resolve, reject)=>
    {
        getUserContactsByHash(userid,contactid,hash).then(res=>{
            if(!res){
                resolve(false)
            }else{
                resolve(true)
            }
        }).catch((e)=>{
            reject(e)
        })
    })
}

async function userTaskByHash(userid,taskid,hash){
    return new Promise((resolve, reject)=>
    {
        getUserTaskByHash(userid,taskid,hash).then(res=>{
            if(!res){
                resolve(false)
            }else{
                resolve(true)
            }
        }).catch((e)=>{
            reject(e)
        })
    })
}

async function getRemoveContactFromUser(contactid, userid, modifierid)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL RemoveContactFromUser('${userid}','${contactid}','${modifierid}')`).then((result)=>
            {
                contactrepo.getDeleteContact(contactid,modifierid).then(res=>{
                    resolve(true)
                }).catch((e)=>{
                    reject(e)
                })
            }).catch((e)=>
            {

                reject(e)
                
            })
            res.release();
        })
    })
}

async function CreateUser(username, password, firstname, lastname, hash, userid, allprivileges)
{
    return new Promise((resolve, reject)=>
    {
        if(!username || !password || !hash || allprivileges===null)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check permission
        getUserPermission("CanEditUser",userid).then(res=>{
            if(!res){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //create user
            getCreateUser(username, encrypt(password), firstname?firstname:"", lastname?lastname:"", hash, userid, allprivileges?1:0).then((result)=>
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

async function AddContactToUser(userid,hash,typename,value,description,ispublic,targetid){
    return new Promise((resolve, reject)=>
    {
        if(!targetid || !typename || !value || ispublic===null)
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
            return
        }
        //check permission
        getUserPermission("CanEditUser",userid).then(res=>{
            if(!res && userid != targetid){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check target user exists
            userByHash(targetid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return 
                }
                //create contact
                contactrepo.getCreateContact(typename,value,description?description:"",ispublic?1:0,userid,hash).then(res=>{
                    //add contact to user
                    getAddContactToUser(res['Id'],targetid,userid,hash).then(res2=>{

                        resolve((jsonParser.combineJSON(protocol.status(true),contactrepo.viewToContact(res2))));
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

async function RemoveContactFromUser(userid,hash,contactid,targetid){
    return new Promise((resolve,reject)=>{
        if(!contactid || !targetid){
            resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
            return
        }
        //check permission
        getUserPermission("CanEditUser",userid).then(result=>{
            if(!result && userid != targetid){
                resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(4))));
                return
            }
            //check user
            logger.debug(targetid)
            userByHash(targetid,hash).then(res2=>{
                if(!res2){
                    resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1))));
                    return
                }
                //check contact exist of user
                userContactByHash(targetid,contactid,hash).then(res3=>{
                    if(!res3){
                        resolve((jsonParser.combineJSON(protocol.status(false),protocol.error(1)))); 
                        return
                    }
                    //remove contact
                    getRemoveContactFromUser(contactid,targetid,userid).then(res=>{
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

function ViewToPermission(viewobj){
    return {'Permission':permissiondao.GetPermission(viewobj['Permission_idPermission'],viewobj['PermissionName'],viewobj['IsEnabled']==='001'?true:false)}
}



module.exports={
    authenticateUser:authenticateUser,
    userByHash:userByHash,
    loginUser:loginUser,
    ListUsers:ListUsers,
    ListUserContacts:ListUserContacts,
    ListUserPermissions:ListUserPermissions,
    CreateUser:CreateUser,
    getUserPermission:getUserPermission,
    DeleteUser:DeleteUser,
    ModifyUser:ModifyUser,
    RemoveContactFromUser:RemoveContactFromUser,
    AddContactToUser:AddContactToUser,
    ModifyUserPermission:ModifyUserPermission,
    userTaskByHash:userTaskByHash,
    ViewToUser:ViewToUser

}