import { router } from "../index.js";
import { makeRequest, onRequestFailed } from "../utilities/serviceHandler.js";
import { getHeader } from "../utilities/sessionJanitor.js";
import {addTaskedUserOnNew,addNonTaskedUserOnNew, addTaskedTeamOnNew, addNonTaskedTeamsOnNew} from '../view/listBuilders/adminTaskListBuilder.js';


export function addUserToTask(user){
    const nonmembers = document.getElementById('nonmembers');
    nonmembers.removeChild(document.getElementById('nontaskeduser'+user.id));
    addTaskedUserOnNew(user);
}

export function removeUserFromTask(user){
    const members = document.getElementById('members');
    members.removeChild(document.getElementById('taskeduser'+user.id));
    addNonTaskedUserOnNew(user);
}

export function addTeamToTask(team){
    
    const nonteams = document.getElementById('nonteams');
    nonteams.removeChild(document.getElementById('nontaskedteam'+team.id));
    addTaskedTeamOnNew(team);
}

export function removeTeamFromTask(team){
    const teams = document.getElementById('teams');
    teams.removeChild(document.getElementById('taskedteam'+team.id));
    addNonTaskedTeamsOnNew(team);
}

export function OnCreateTask(){
    let name = document.getElementById('taskname').value;
    let desc = document.getElementById('taskdesc').value;
    let deadline = document.getElementById('deadline').value;
    makeRequest('/task/create','POST',getHeader(),JSON.stringify({"Taskname":name,"Description":desc,"Deadline":deadline}),(data)=>{
        if(data.Status === 'Failed'){
            onRequestFailed(data.Message);
        }
        else{
            let taskId = data.Id;
            const teams = document.getElementById('teams');
            const members = document.getElementById('members');
            for(let element of teams.children){
                let id = element.dataset.id;
                console.log('a csapat id-je:',id);
               
                makeRequest('/team/add/task','POST',getHeader(),JSON.stringify({"Taskid":taskId,"Teamid":id}),(data)=>{
                    if(data.Status === 'Failed'){
                        onRequestFailed(data.Message);
                    }
                    else{
                        console.log('csapat sikeresen hozzáadva')};
                    },()=>alert("Server not found"))
                    
            }
            for(let element of members.children){
                let id = element.dataset.id;
                console.log('a felhasználó id-je:',id);
                makeRequest('/user/add/task','POST',getHeader(),JSON.stringify({"Taskid":taskId,"Userid":id}),()=>{if(data.Status === 'Failed'){
                    onRequestFailed(data.Message);
                }
                else{
                    console.log('felhasználó sikeresen hozzáadva')};
                },()=>alert("Server not found"));
            }
            router.navigate('alltaskAdmin');
        }

    },()=>alert('Server not found'))
    
}