import {SessionJanitor} from '../utilities/sessionJanitor.js'

export function createRecord(){
    let taskid = document.getElementById('newRecordForm_taskSelect').value
    if(taskid == -1){
        alert('Nincs feladat kiválasztva')
        return
    }
    let desc = document.getElementById('newRecordForm_desc').value
    let hour = document.getElementById('newRecordForm_hour').value
    let min = document.getElementById('newRecordForm_min').value
    if(SessionJanitor.getSessionUser().permissions.find(x=>x.permissionname === 'CanEditRecord')['isenabled'])
    let date = document.getElementById('newRecordForm_date').value
    if(!hour || !min){
        alert('meg kell adni az időt')
    }
}