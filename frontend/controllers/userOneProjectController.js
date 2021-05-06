import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import {createOneProjectView} from '../view/content/user/projects/oneProject.js';

export function getTaskAttributes(id,name,desc){
    console.log(id);
    console.log(name);
    console.log(desc);
    makeRequest('/task/get/users','POST',getHeader(),JSON.stringify({"Taskid":id}),(data)=>{onGetUsersSuccess(data,id,name,desc)},()=>onAjaxFail());
}

function onGetUsersSuccess(data,id,name,desc){
    console.log(data);

    makeRequest('/task/get/records','POST',getHeader(),JSON.stringify({"Taskid":id}),(data2)=>{onGetUsersSucces(data2,data,name,desc)},()=>onAjaxFail());
}

function onGetUsersSucces(data2,data,name,desc){
    console.log(data2); //records
    console.log(data); //users
    router.navigate("oneProjectUser");
    createOneProjectView(name,desc,data2.Records,data.Users);
}

function onAjaxFail(){
    console.log("onAjaxFail");
}
