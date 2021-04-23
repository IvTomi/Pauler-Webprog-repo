const fs = require("fs");
const path = require('path');
const DateFormatter = require("./DateFormatter");
const dformatter = require('./DateFormatter');
const configurationManager = require('../Utility/ConfigurationManager');

const logpath = path.normalize(configurationManager.logPath());
const logfilename = configurationManager.logFileName();

function createLogStream(){
    if(!fs.existsSync(path.join(logpath+logfilename))){
        fs.mkdirSync(logpath,{recursive:true},error=>{
            if (error){
                throw error;
            }
        })
        console.log(path.join(logpath+logfilename))
        fs.writeFileSync(path.join(logpath+logfilename),"",error=>{
            throw error;
        });
    }
    
    return fs.createWriteStream(path.join(logpath+logfilename),{flags:'a'},error=>{
        throw error;
    })
}

function info(msg) {
    try{
        msg = 'Info: '+ msg
        createLogStream().write(createMessage(msg));
        console.log(createMessage(msg));
    }catch(err){
        consoleError('Error writing to log file: '+err)
    }
    
  
};

function debug(msg) {
    try{
        msg = 'Debug: '+ msg
        createLogStream().write(createMessage(msg));
        console.log(createMessage(msg));
    }catch(err){
        consoleError('Error writing to log file: '+err)
    }
};

function error(msg) {
    try{
        msg = 'Error: '+ msg
        createLogStream().write(createMessage(msg));
        console.log(createMessage(msg));
    }catch(err){
        consoleError('Error writing to log file: '+err)
    }
};

function consoleError(msg){
    console.log(createMessage(msg));
}

function createMessage(msg){
    return dformatter.getCurrentTimeStamp() + "\t" + msg + "\n";
}

module.exports={
    info:info,
    debug:debug,
    error:error
}
