const configurationManager = require('../Utility/ConfigurationManager');

const dbconfig = configurationManager.databaseConnection();
const logger = require('../Utility/Logger');
const mysql = require('mysql-await');

const pool = mysql.createPool(dbconfig);
logger.info("Database connection pool created");

pool.on(`acquire`, (connection) => {
    logger.debug(`Connection ${connection.threadId} acquired`);
  });
  
pool.on(`connection`, (connection) => {
logger.debug(`Connection ${connection.threadId} connected`);
});

pool.on(`enqueue`, () => {
logger.debug(`Waiting for available connection slot`);
});

pool.on(`release`, function (connection) {
logger.debug(`Connection ${connection.threadId} released`);
});

async function testConnection(){
    return new Promise((resolve,reject)=>{
        pool.awaitGetConnection().then((res)=>{
            logger.debug('Executing "SELECT 1+1 AS Result"')
            res.awaitQuery('SELECT 1+1 AS Result').then((result)=>{
                logger.debug('Connection established with the database'); 
                resolve(true);                     
            }).catch((err)=>{
                logger.error(err);
                resolve(false);
            })
            res.release();   
        })
    })
    
}

process.on('SIGTERM', async()=>{
    await pool.awaitEnd().then(()=>{
        logger.info("Database connection pool closed")
    }).catch((err)=>{
        logger.error(`Error closing database connection pool: ${err}`)
    });
});
process.on('SIGINT',async()=>{
    await pool.awaitEnd().then(()=>{
        logger.info("Database connection pool closed")
    }).catch((err)=>{
        logger.error(`Error closing database connection pool: ${err}`)
    });
});


module.exports = {
    ConnectionPool:pool,
    testConnection : testConnection
}
