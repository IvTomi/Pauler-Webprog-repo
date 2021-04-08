const moment = require('moment')

function getCurrentTimeStamp(){
   return moment().format('YYYY/MM/DD, h:mm:ss a')
}


module.exports = {
    getCurrentTimeStamp : getCurrentTimeStamp
}