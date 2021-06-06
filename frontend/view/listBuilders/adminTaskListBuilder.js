import { addUserToTask, removeUserFromTask, addTeamToTask, removeTeamFromTask } from "../../controllers/adminNewTaskController.js";
import { addTeamToexistTask, addUserToexistTask, onTeamClicked, onTeamSelectedClicked, removeTeamFromexistTask, removeUserFromexistTask } from "../../controllers/adminOneTaskController.js";

import HTMLTag from "../../utilities/HTMLTag.js";




export function addNonTaskedUserOnNew(user,appendPoint){
    appendPoint = document.getElementById('nonmembers');
    const li = new HTMLTag('li').addAttr('id','nontaskeduser'+user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Hozzáad').addAttr('class','addBtn2').append(li).onclick(()=>{addUserToTask(user)});
    li.append(appendPoint);
}


export function addTaskedUserOnNew(user,appendPoint){
    appendPoint = document.getElementById('members');
    const li = new HTMLTag('li').addAttr('id','taskeduser'+user.id).addAttr('data-id',user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Töröl').addAttr('class','deleteBtn').append(li).onclick(()=>{removeUserFromTask(user)});
    li.append(appendPoint);
}

export function addNonTaskedTeamsOnNew(team,appendPoint){
    appendPoint = document.getElementById('nonteams');
    const li = new HTMLTag('li').addAttr('id','nontaskedteam'+team.id);
    new HTMLTag('p').setText(team.teamname).append(li);
    new HTMLTag('button').setText('Hozzáad').addAttr('class','addBtn2').append(li).onclick(()=>{addTeamToTask(team)});
    li.append(appendPoint);
}

export function addTaskedTeamOnNew(team,appendPoint){
    appendPoint = document.getElementById('teams');
    const li = new HTMLTag('li').addAttr('id','taskedteam'+team.id).addAttr('data-id',team.id);
    new HTMLTag('p').setText(team.teamname).append(li);
    new HTMLTag('button').setText('Töröl').addAttr('class','deleteBtn').append(li).onclick(()=>{removeTeamFromTask(team)});
    li.append(appendPoint);
}

export function listAllTasks(data, appendPoint){
    appendPoint = document.getElementById('list');
    for(let task of data){
        let taask = task.Task;
        const li = new HTMLTag('li').append(appendPoint).addAttr('class','listItem').onclick(()=>onTeamSelectedClicked(JSON.stringify(taask)));
        new HTMLTag('p').setText(taask.taskname).append(li);
        new HTMLTag('p').setText(taask.description).append(li);
        new HTMLTag('p').setText(taask.deadline).append(li);

    }
}

export function addNonTaskedToExisting(user,appendPoint,taskid){
    appendPoint = document.getElementById('nonmembers');
    const li = new HTMLTag('li').addAttr('id','nontaskeduser'+user.id).addAttr('data-id',user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Hozzáad').addAttr('class','addBtn2').append(li).onclick(()=>{addUserToexistTask(user,taskid)});
    li.append(appendPoint);
}

export function addTaskedToExisting(user,appendPoint,taskid){
    appendPoint = document.getElementById('members');
    const li = new HTMLTag('li').addAttr('id','taskeduser'+user.id);
    new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
    new HTMLTag('button').setText('Töröl').addAttr('class','deleteBtn').append(li).onclick(()=>{removeUserFromexistTask(user,taskid)});
    li.append(appendPoint);
}

export function addNonTaskedTeamToExisting(team,appendPoint,taskid){
    appendPoint = document.getElementById('other-teams');
    const li = new HTMLTag('li').addAttr('id','nontaskedteam'+team.id).addAttr('data-id',team.id);

    new HTMLTag('p').setText(team.teamname).append(li).onclick(()=>onTeamClicked(team));
    new HTMLTag('button').setText('Hozzáad').addAttr('class','addBtn2').append(li).onclick(()=>{addTeamToexistTask(team,taskid)});

    li.append(appendPoint);
}

export function addTaskedTeamToExisting(team,appendPoint,taskid){
    appendPoint = document.getElementById('assigned-teams');
    const li = new HTMLTag('li').addAttr('id','taskedteam'+team.id);
    new HTMLTag('p').setText(team.teamname).append(li).onclick(()=>onTeamClicked(team));
    new HTMLTag('button').setText('Töröl').addAttr('class','deleteBtn').append(li).onclick(()=>{removeTeamFromexistTask(team,taskid)});

    li.append(appendPoint);
}

export function makeRecordsListForTask(list,appendPoint,users){
    for(let record of list){
        record = record.Record;
        
        let li = new HTMLTag('li').append(appendPoint);
        for(let user of users){
           if(user.id==record.userid){
            new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
           }
        }

        new HTMLTag('p').setText(record.hour+':'+record.min).append(li);
        new HTMLTag('p').setText(record.comment).append(li);
        new HTMLTag('p').setText(record.recorddate).append(li);
    }
}