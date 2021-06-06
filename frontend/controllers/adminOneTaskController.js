import { router } from "../index.js";
import { makeRequest, onRequestFailed } from "../utilities/serviceHandler.js";
import { getHeader } from "../utilities/sessionJanitor.js";
import {SessionJanitor} from '../utilities/sessionJanitor.js';
import { addNonTaskedToExisting, addTaskedToExisting, makeRecordsListForTask, addTaskedTeamToExisting, addNonTaskedTeamToExisting } from "../view/listBuilders/adminTaskListBuilder.js";

export function onTeamSelectedClicked(task){
    sessionStorage.setItem('activeTask',task);
    router.navigate('onetaskAdmin');
}

export function onTeamClicked(team){
    sessionStorage.setItem('activeTeam',JSON.stringify(team));
    router.navigate('teamInfoAdmin');
}


export function memberDistribution(taskid){
    
    makeRequest('/task/get/users','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }
        else{
            let taskmembers = data.Users;
            let taskmemids = [];
            for(let user of taskmembers){
                user = user.User;
                taskmemids.push(user.id);
                
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


export function teamDistribution(taskid){
    makeRequest('/task/get/teams','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }
        else{
            let taskteams = data.Teams;
            let taskteamids = [];
            for(let team of taskteams){
                team = team.Team;

                taskteamids.push(team.id);
                
            }
            SessionJanitor.getAllTeams().forEach(element => {
                let team = element.Team;
                if(taskteamids.includes(team.id)){
                    addTaskedTeamToExisting(team,{},taskid);
                }
                else{
                    addNonTaskedTeamToExisting(team,{},taskid);
                }
            });
        }
    },()=>{alert('Server not found')})
}

export function addUserToexistTask(user,taskid){
    makeRequest('/user/add/task','POST',getHeader(),JSON.stringify({"Userid":user.id,"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }
        else{
            let nonmembers= document.getElementById('nonmembers');
            nonmembers.removeChild(document.getElementById('nontaskeduser'+user.id));
            addTaskedToExisting(user,{},taskid);
        }
        
    },()=>{alert('Server not found')})
}

export function removeUserFromexistTask(user,taskid){
    makeRequest('/user/remove/task','POST',getHeader(),JSON.stringify({"Userid":user.id,"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }
        else{
            let members= document.getElementById('members');
            members.removeChild(document.getElementById('taskeduser'+user.id));
            addNonTaskedToExisting(user,{},taskid);
        }
    },()=>{alert('Server not found')})
}

export function addTeamToexistTask(team,taskid){
    makeRequest('/team/add/task','POST',getHeader(),JSON.stringify({"Teamid":team.id,"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }
        else{
            let nonmembers= document.getElementById('other-teams');
            nonmembers.removeChild(document.getElementById('nontaskedteam'+team.id));
            addTaskedTeamToExisting(team,{},taskid);
        }
    },()=>{alert('Server not found')})
}

export function removeTeamFromexistTask(team,taskid){
    makeRequest('/team/remove/task','POST',getHeader(),JSON.stringify({"Teamid":team.id,"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }
        else{
            let members= document.getElementById('assigned-teams');
            members.removeChild(document.getElementById('taskedteam'+team.id));
            addNonTaskedTeamToExisting(team,{},taskid);
        }
    },()=>{alert('Server not found')})
}


export function deleteTask(taskid){
    makeRequest('/task/remove','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }  
        else{
            setTimeout(()=>{router.navigate('newtaskAdmin')},1000);
        }
    },()=>{alert('Server not found')})
}

export function makeRecords(taskid){
    
    makeRequest('/task/get/records','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }  
        else{
            let list = data.Records;
            let appendPoint = document.getElementById('records');
            let users = SessionJanitor.getAllUsers(null);

            for(let record of list){
                record = record.Record;
                
                let li = new HTMLTag('li').append(appendPoint);
                for(let user of users){
                   if(user.id==record.userid){
                    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
                   }
                }
                new HTMLTag('p').setText(record.comment).append(li);
                new HTMLTag('p').setText(record.hour+':'+record.min).append(li);
                new HTMLTag('p').setText(record.recorddate).append(li);
            }

            makeRecordsListForTask(list,appendPoint,users);

            
        }
    },()=>{alert('Server not found')})
}
