const config = require('../Resources/config.json')

function getConfigByKey(key){
    return config[key];
}

function getPort(){
    return config['port'];
}

function getEncryptionMethod(){
    return config['encryptionMethod'];
}

function getLogPath(){
    return config['logPath'];
}

function getLogFileName(){
    return config['logFileName'];
}

function getNonIdentifiedRoutes(){
    return config['non-identify-routes'];
}

function getDatabaseConnection(){
    return config['databaseConnection'];
}

function getSecret(){
    return config['secret'];
}

module.exports = {
    getConfigByKey:getConfigByKey,
    port:getPort,
    logPath:getLogPath,
    logFileName:getLogFileName,
    nonidentifiedRoutes:getNonIdentifiedRoutes,
    databaseConnection:getDatabaseConnection,
    secret:getSecret,
    encryptionMethod:getEncryptionMethod
}