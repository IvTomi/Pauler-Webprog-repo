import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import createUsersTeamInfoView from '../view/content/user/teams/oneTeamU.js';

export function getTeamAttributes(id,name,desc){

    makeRequest('/team/get/tasks','POST',getHeader(),JSON.stringify({"Teamid":id}),(data)=>{onGetTasksSucces(data,name,desc)},()=>onAjaxFail());

}



function onGetTasksSucces(data,name,desc,id){

    makeRequest('/team/get/users','POST',getHeader(),JSON.stringify({"Teamid":id}),(data2)=>{onGetUsersSucces(data,data2,name,desc,id)},()=>onAjaxFail());
}

function onGetUsersSucces(data,data2,name,desc){

    createUsersTeamInfoView(name,desc,data,data2);
    
}


function onAjaxFail(){
    console.log("onAjaxFail");
}