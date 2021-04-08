const config = require('../Resources/config.json')

function getConfigByKey(key){
    return config[key];
}

module.exports = {
    getConfigByKey:getConfigByKey
}