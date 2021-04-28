const protocolConfig = require('../Resources/protocol.json');
const Logger = require('./Logger');

function getStatus(isSuccess){
    if(isSuccess){
        return protocolConfig["Status"]["Success"];
        
    }else{
        return protocolConfig["Status"]["Fail"];
    }
}
   


function getError(code){
    return protocolConfig["Error"][code];
}

function userObject(){   
    return new getProtocolObject("User")
}

module.exports={
    error:getError,
    status:getStatus,
    userObject:userObject
}

