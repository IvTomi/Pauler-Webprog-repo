import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import createMyProjectsView from '../view/content/user/projects/myProjects.js';


export function AllTaskList(){
    makeRequest('/task/list','POST',getHeader(),"{}",(data)=>{onGetTasksSucces(data)},()=>onAjaxFail());

}

export function MyTasksList(userid){
    console.log(userid)
    makeRequest('/user/get/tasks','POST',getHeader(),JSON.stringify({"Userid":userid}),(data)=>{onGetTasksSucces(data)},()=>onAjaxFail());
}
function onGetTasksSucces(data){
    console.log(data);

    createMyProjectsView(data.Tasks);
}

function onAjaxFail(){
    console.log('onAjaxFail');
}