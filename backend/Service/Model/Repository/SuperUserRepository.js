const dbConnector = require("../DatabaseConnector"); 
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const protocol = require('../../Utility/Protocol');
const jsonParser = require('../../Utility/JSONParser');
const Logger = require("../../Utility/Logger");

const pool = dbConnector.ConnectionPool;

async function getRegisterSuperUser(username, password, email, company){
    return new Promise((resolve, reject)=>{
        pool.awaitGetConnection().then((res)=>{
            pool.awaitQuery(`CALL RegisterSuperUser('${username}','${password}','${email}','${company}')`).then((result)=>{
                resolve(result[result.length-2][0]);
            }).catch((e)=>{
                resolve(null);
            })
        })
    })
}

async function registerSuperUser(username, password, email, company)
{

    return new Promise((resolve, reject)=>{
        if(!checkRegisterInput(username,password,email,company))
        {
            resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
        }
        getRegisterSuperUser(username, encrypt(password), email, company).then((result)=>{
            if(result == null){
                resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(2)));
            }
            else{
                Logger.debug(JSON.stringify(result));
                resolve(jsonParser.combineJSON(protocol.status(true),JSON.parse(`{"Hash":"${result['Hash']}"}`)));
            }
        })
    })
}

function checkRegisterInput(username,password,email,company){
    if(username && password && email && company){
        return true;
    }else{
        return false;
    }
}

module.exports={
    registerSuperUser:registerSuperUser
}