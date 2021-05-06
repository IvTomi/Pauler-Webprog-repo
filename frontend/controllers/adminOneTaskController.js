import { router } from "../index.js";
import HTMLTag from "../utilities/HTMLTag.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import { getHeader } from "../utilities/sessionJanitor.js";
import {SessionJanitor} from '../utilities/sessionJanitor.js';
import { addNonTaskedToExisting, addTaskedToExisting } from "../view/listBuilders/adminTaskListBuilder.js";

export function onTeamSelectedClicked(taask){
    sessionStorage.setItem('activeTask',taask);
    router.navigate('onetaskAdmin');
}

export function memberDistribution(taskid){
    
    makeRequest('/task/get/users','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }
        else{
            let taskmembers = data.Users;
            let taskmemids = [];
            for(let user of taskmembers){
                user = user.User;
                taskmemids.push(user.id);
                console.log(taskmemids);
                
            }
            SessionJanitor.getAllUsers().forEach(element => {
                if(taskmemids.includes(element.id)){
                    addTaskedToExisting(element,{},taskid);
                }
                else{
                    addNonTaskedToExisting(element,{},taskid);
                }
            });
        }
    },()=>{alert('Server not found')})
}


export function addUserToexistTask(user,taskid){
    makeRequest('/user/add/task','POST',getHeader(),JSON.stringify({"Userid":user.id,"Taskid":taskid}),()=>{
        let nonmembers= document.getElementById('nonmembers');
        nonmembers.removeChild(document.getElementById('nontaskeduser'+user.id));
        addTaskedToExisting(user,{},taskid);
    },()=>{alert('Server not found')})
}

export function removeUserFromexistTask(user,taskid){
    makeRequest('/user/remove/task','POST',getHeader(),JSON.stringify({"Userid":user.id,"Taskid":taskid}),()=>{
        let members= document.getElementById('members');
        members.removeChild(document.getElementById('taskeduser'+user.id));
        addNonTaskedToExisting(user,{},taskid);
    },()=>{alert('Server not found')})
}


export function deleteTask(taskid){
    makeRequest('/task/remove','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }  
        else{
            setTimeout(()=>{router.navigate('newtaskAdmin')},1000);
        }
    },()=>{alert('Server not found')})
}

export function makeRecords(taskid){
    
    makeRequest('/task/get/records','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }  
        else{
            let list = data.Records;
            let appendPoint = document.getElementById('records');
            for(let record of list){
                record = record.Record;
                let li = new HTMLTag('li').append(appendPoint);
                new HTMLTag('p').setText(record.comment).append(li);
                new HTMLTag('p').setText(record.recorddate).append(li);
            }
            
        }
    },()=>{alert('Server not found')})
}