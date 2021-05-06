import { addUserToTask, removeUserFromTask, addTeamToTask, removeTeamFromTask } from "../../controllers/adminNewTaskController.js";
import { addUserToexistTask, onTeamSelectedClicked, removeUserFromexistTask } from "../../controllers/adminOneTaskController.js";

import HTMLTag from "../../utilities/HTMLTag.js";




export function addNonTaskedUserOnNew(user,appendPoint){
    appendPoint = document.getElementById('nonmembers');
    const li = new HTMLTag('li').addAttr('id','nontaskeduser'+user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{addUserToTask(user)});
    li.append(appendPoint);
}

export function addTaskedUserOnNew(user,appendPoint){
    appendPoint = document.getElementById('members');
    const li = new HTMLTag('li').addAttr('id','taskeduser'+user.id).addAttr('data-id',user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{removeUserFromTask(user)});
    li.append(appendPoint);
}

export function addNonTaskedTeamsOnNew(team,appendPoint){
    appendPoint = document.getElementById('nonteams');
    const li = new HTMLTag('li').addAttr('id','nontaskedteam'+team.id);
    new HTMLTag('p').setText(team.teamname).append(li);
    new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{addTeamToTask(team)});
    li.append(appendPoint);
}

export function addTaskedTeamOnNew(team,appendPoint){
    appendPoint = document.getElementById('teams');
    const li = new HTMLTag('li').addAttr('id','taskedteam'+team.id).addAttr('data-id',team.id);
    new HTMLTag('p').setText(team.teamname).append(li);
    new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{removeTeamFromTask(team)});
    li.append(appendPoint);
}

export function listAllTasks(data, appendPoint){
    appendPoint = document.getElementById('list');
    for(let task of data){
        let taask = task.Task;
        const li = new HTMLTag('li').append(appendPoint).onclick(()=>onTeamSelectedClicked(JSON.stringify(taask)));
        new HTMLTag('p').setText(taask.taskname).append(li);
        new HTMLTag('p').setText(taask.description).append(li);
        new HTMLTag('p').setText(taask.deadline).append(li);

    }
}

export function addNonTaskedToExisting(user,appendPoint,taskid){
    appendPoint = document.getElementById('nonmembers');
    const li = new HTMLTag('li').addAttr('id','nontaskeduser'+user.id).addAttr('data-id',user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{addUserToexistTask(user,taskid)});
    li.append(appendPoint);
}

export function addTaskedToExisting(user,appendPoint,taskid){
    appendPoint = document.getElementById('members');
    const li = new HTMLTag('li').addAttr('id','taskeduser'+user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{removeUserFromexistTask(user,taskid)});
    li.append(appendPoint);
}