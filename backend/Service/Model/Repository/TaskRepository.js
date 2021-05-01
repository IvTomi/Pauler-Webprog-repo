const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const jsonParser = require('../../Utility/JSONParser');
const userdao = require('../DaO/UserDaO');

async function getTaskByHash(id, hash){   
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            res.awaitQuery(`CALL GetTaskByHash('${id}','${hash}')`).then((result)=>{
                resolve(result[result.length-2][0]);                     
            }).catch((e)=>{
                
                logger.error(e);
                resolve(JSON.stringify(jsonParser.combineJSON(protocol.status(false),protocol.error(99))));
            })
            res.release();   
        })
    })
}