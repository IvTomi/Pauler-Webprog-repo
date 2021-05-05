const moment = require('moment')
const Logger = require('./Logger')

function getCurrentTimeStamp(){
   return moment().format('YYYY/MM/DD, hh:mm:ss a')
}

function getCurrentDate(){
    return moment().format('YYYY.MM.DD')
 }

function getMySqlDate(date){
    return date
}


module.exports = {
    getCurrentTimeStamp : getCurrentTimeStamp,
    getMySqlDate:getMySqlDate,
    getCurrentDate:getCurrentDate
}