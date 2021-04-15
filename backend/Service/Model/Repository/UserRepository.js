const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const jsonParser = require('../../Utility/JSONParser');

const pool = dbConnector.ConnectionPool;

async function getAuthenticateUser(username, hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL AuthenticateUser('${username}','${hash}')`).then((result)=>{
                resolve(result);                     
            }).catch(()=>{
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
            }else{
                try{
                    if(password === encryptor.decrypt(password)){
                        resolve(JSON(protocol.status(true)));
                    }else{
                        resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
                    }
                }catch{
                    resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(1)));
                }
                
            }
        })
    })
}

module.exports={
    authenticateUser:authenticateUser
}