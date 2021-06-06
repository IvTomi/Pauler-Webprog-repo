
import {makeRequest, onRequestFailed} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import { createTeamMemberList, createTeamProjectList } from '../view/listBuilders/userTeamListBuilder.js';

export function getTeamTasks(teamid){
    makeRequest('/team/get/tasks','POST',getHeader(),JSON.stringify({"Teamid":teamid}),(data)=>{onGetTasksSucces(data)},()=>onAjaxFail());
}

export function getTeamUsers(teamid){
    makeRequest('/team/get/users','POST',getHeader(),JSON.stringify({"Teamid":teamid}),(data)=>{onGetUsersSucces(data)},()=>onAjaxFail());
}

export function onTaskClicked(task){
    //
    //
    //Ide lehet, hogy mi történjen, ha az egyik taskra rá kattintanak
    console.log(task);
    //
    //
    //
    //
}

function onGetUsersSucces(data){
    if(data.Status === 'Failed'){
        onRequestFailed(data.Message);
    }
    else{
        createTeamMemberList(data.Users);
    }
}

function onGetTasksSucces(data){
    if(data.Status === 'Failed'){
        onRequestFailed(data.Message);
    }
    else{
        createTeamProjectList(data.Tasks);
    }
}

function onAjaxFail(){
    alert('Server not found');
}