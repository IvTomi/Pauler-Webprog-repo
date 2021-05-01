const dbConnector = require("../DatabaseConnector"); 
const logger = require('../../Utility/Logger');
const protocol = require('../../Utility/Protocol');
const encryptor = require('../../Utility/Encryptor');
const jsonParser = require('../../Utility/JSONParser');

const pool = dbConnector.ConnectionPool;

async function getRecordByHash(recordid, hash)
{
    return new Promise((resolve, reject)=>
    {
        pool.awaitGetConnection().then((res)=>
        {
            res.awaitQuery(`CALL GetRecordByHash(${recordid},'${hash}')`).then((result)=>
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
async function recordByHash(recordid, hash)
{
    return new Promise((resolve, reject)=>
    {
        if(!recordid || !hash) resolve(jsonParser.combineJSON(protocol.status(false),protocol.error(3)));
        getRecordByHash(recordid, hash).then((result)=>
        {
            if(result==null)
            {
                resolve(false);
            }
            else
            {
                Logger.debug(JSON.stringify(result));
                resolve(result);
            }
        })
    })
}

module.exports={
    recordByHash:recordByHash,
}