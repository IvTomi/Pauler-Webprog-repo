import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import createUsersTeamInfoView from '../view/content/user/teams/oneTeamU.js';

export function getTeamAttributes(id,name,desc){
    makeRequest('/team/get/tasks','POST',getHeader(),JSON.stringify({"Teamid":id}),(data)=>{onGetTasksSuccess(data,id,name,desc)},()=>onAjaxFail());
}

function onGetTasksSuccess(data,id,name,desc){
    makeRequest('/team/get/users','POST',getHeader(),JSON.stringify({"Teamid":id}),(data2)=>{onGetUsersSucces(data2,data,name,desc)},()=>onAjaxFail());
}

function onGetUsersSucces(data2,data,name,desc){
    createUsersTeamInfoView(name,desc,data2,data);
}

function onAjaxFail(){
    console.log("onAjaxFail");
}