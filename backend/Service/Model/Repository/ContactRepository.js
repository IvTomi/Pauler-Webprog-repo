const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');
const contactdao = require('../DaO/ContactDaO');

const pool = dbConnector.ConnectionPool;

async function getCreateContact(contacttype,value,comment,ispublic,userid,hash){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL CreateContact('${contacttype}','${value}','${comment}','${userid}','${ispublic}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
                
                reject(e)
            })
            res.release();   
        })
    })
}

async function getDeleteContact(contactid,userid){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL DeleteContact('${contactid}','${userid}')`).then((result)=>{
                resolve(true)                   
            }).catch((e)=>{
                
                reject(e)
            })
            res.release();   
        })
    })
}
async function getModifyContact(contactid,value,comment,ispublic,userid){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL ModifyCpntact('${contactid}','${value}','${comment}','${ispublic}','${userid}')`).then((result)=>{
                resolve(true)                   
            }).catch((e)=>{
                if(e['sqlState'] === '45000'){
                    resolve(false);
                }
                reject(e)
            })
            res.release();   
        })
    })
}

async function getContactByHash(contactid,hash){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetContactByHash('${contactid}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0])                   
            }).catch((e)=>{
                reject(e)
            })
            res.release();   
        })
    })
}

async function contactByHash(contactid,hash){
    return new Promise((resolve,reject)=>{
        getContactByHash(contactid,hash).then(res=>{
            if(res==null){
                resolve(false)
            }else{
                resolve(true)
            }
        }).catch((e)=>{
            reject(e)
        })
       
    })
}

function viewToContact(viewobj){
    return {"Contact":contactdao.GetContact(viewobj['Contact_idContact'],viewobj['TypeName'],viewobj['Value'],viewobj['Comment'],viewobj['IsPublic']==1?true:false)}
}

module.exports={
    getCreateContact:getCreateContact,
    getDeleteContact:getDeleteContact,
    getModifyContact:getModifyContact,
    getContactByHash:getContactByHash,
    contactByHash:contactByHash,
    viewToContact:viewToContact
}