import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import { createTeamMemberList, createTeamProjectList } from '../view/listBuilders/userTeamListBuilder.js';

export function getTeamTasks(teamid){
    makeRequest('/team/get/tasks','POST',getHeader(),JSON.stringify({"Teamid":teamid}),(data)=>{onGetTasksSucces(data)},()=>onAjaxFail());
}

export function getTeamUsers(teamid){
    makeRequest('/team/get/users','POST',getHeader(),JSON.stringify({"Teamid":teamid}),(data)=>{onGetUsersSucces(data)},()=>onAjaxFail());
}

function onGetUsersSucces(data){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        createTeamMemberList(data.Users);
    }
}

function onGetTasksSucces(data){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        createTeamProjectList(data.Tasks);
    }
}

function onAjaxFail(){
    alert('Server not found');
}