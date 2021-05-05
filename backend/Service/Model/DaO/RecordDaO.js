const dateformatter = require('../../Utility/DateFormatter')

let Record = function (id,userid,taskid,recorddate,hour,min,comment){
    this.Id = id
    this.UserId = userid
    this.TaskId = taskid
    this.RecordDate = recorddate
    this.Hour = hour
    this.Min = min
    this.Comment = comment
}

let RecordBuilder = function(){
    let id
    let userid
    let taskid
    let recorddate
    let hour
    let min
    let comment

    return{
        setId: function(id){
            this.id = id? id:-1
            return this
        },
        setUserid: function(userid){
            this.userid = userid? userid:0
            return this
        },
        setTaskid: function(taskid){
            this.taskid = taskid? taskid:0
            return this
        },
        setRecordDate: function(recorddate){
            this.recorddate = recorddate? recorddate:dateformatter.getCurrentDate()
            return this
        },setHour: function(hour){
            this.hour = hour? hour:0
            return this
        },setMin: function(min){
            this.min = min? min:0
            return this
        },setComment: function(comment){
            this.comment = comment? comment:""
            return this
        },
        build:function(){
            return new Record(id,userid,taskid,recorddate,hour,min,comment);
        }
    }
}

function GetRecord(id,userid,taskid,recorddate,hour,min,comment){
    return new RecordBuilder().setId(id).setUserid(userid).setTaskid(taskid).setRecordDate(recorddate).setHour(hour).setMin(min).setComment(comment);
}
function GetRecordListJson(records){
    return {"Records":records}
}

module.exports={
    RecordBuilder : RecordBuilder,
    GetRecord:GetRecord,
    GetRecordListJson:GetRecordListJson
}