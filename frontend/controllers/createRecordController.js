import {SessionJanitor,getHeader} from '../utilities/sessionJanitor.js'
import {makeRequest} from '../utilities/serviceHandler.js'

export function createRecord(){
    let taskid = document.getElementById('newRecordForm_taskSelect').value
    if(taskid == -1){
        alert('Nincs feladat kiválasztva')
        return
    }
    let userid = SessionJanitor.getSessionUser().id
    let desc = document.getElementById('newRecordForm_desc').value
    let hour = document.getElementById('newRecordForm_hour').value
    let min = document.getElementById('newRecordForm_min').value
    let date
    if(SessionJanitor.getSessionUser().permissions.find(x=>x.permissionname === 'CanEditRecord')['isenabled']){
        date  = document.getElementById('newRecordForm_date').value
    }else{
        date = null 
    }
    
    if(!hour || !min){
        alert('meg kell adni az időt')
    }

    makeRequest('/record/create','POST',getHeader(),JSON.stringify({"Date":date,"Comment":desc,"Minute":min,"Hour":hour,"Userid":userid,"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }
        else{
            clearFields();          
        }
    },(req,err)=>{
        console.log(err);
    }) 
}

function clearFields(){
    document.getElementById('newRecordForm_desc').value = ""
    document.getElementById('newRecordForm_hour').value = ""
    document.getElementById('newRecordForm_min').value = ""
    document.getElementById('newRecordForm_date').value = ""
    document.getElementById('newRecordForm_taskSelect').value = -1
}