import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import {createProjectMembersList, createProjectRecordList} from '../view/listBuilders/projectListBuilder.js';


export function getTaskAttributes(id,listDiv){
    console.log(id);

    makeRequest('/task/get/users','POST',getHeader(),JSON.stringify({"Taskid":id}),(data)=>{onGetUsersSuccess(data,listDiv)},()=>onAjaxFail());
}
function onGetUsersSuccess(data,listDiv){
    createProjectMembersList(data,listDiv)
};

export function getTaskRecords(id,listDiv){
    
    makeRequest('/task/get/records','POST',getHeader(),JSON.stringify({"Taskid":id}),(data)=>{onGetRecordsSuccess(data,listDiv)},()=>onAjaxFail());
}

function onGetRecordsSuccess(data,listDiv){
    console.log(data)
    createProjectRecordList(data,listDiv);
}

function onAjaxFail(){
    console.log("onAjaxFail");
}
