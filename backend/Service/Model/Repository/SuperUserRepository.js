const dbConnector = require("../DatabaseConnector"); 
const encryptor = require('../../Utility/Encryptor');
const { encrypt } = require("../../Utility/Encryptor");
const protocol = require('../../Utility/Protocol');
const jsonParser = require('../../Utility/JSONParser');
const Logger = require("../../Utility/Logger");

const pool = dbConnector.ConnectionPool;

//SUPER USER REGISTRATION
async function getRegisterSuperUser(username, password, email, company){
    return new Promise((resolve, reject)=>{
        pool.awaitGetConnection().then((res)=>{
            pool.awaitQuery(`CALL CreateSuperUser('${username}','${password}','${email}','${company}')`).then((result)=>{
                resolve(result[result.length-2][0]);
            }).catch((e)=>{
                resolve(null);
            })
            res.release()
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

//GET SUPERUSER BY HASH
async function getSuperUserByHash(superuserid, hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetSuperUserByHash(${superuserid},'${hash}')`).then((result)=>
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
async function superUserByHash(superuserid, hash)
{
    return new Promise((resolve, reject)=>
    {
        getSuperUserByHash(superuserid, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                Logger.debug(JSON.stringify(result[0][0]));
                resolve(result[0][0]);
            }
        })
    })

}

module.exports={
    registerSuperUser:registerSuperUser,
    superUserByHash:superUserByHash,
}