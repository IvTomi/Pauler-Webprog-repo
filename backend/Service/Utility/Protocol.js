const protocolConfig = require('../Resources/protocol.json')

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

module.exports={
    error:getError,
    status:getStatus
}

