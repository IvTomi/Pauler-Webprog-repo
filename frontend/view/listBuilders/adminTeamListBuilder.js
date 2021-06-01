import HTMLTag from '../../utilities/HTMLTag.js';
import {onTeamClicked,onTaskClicked,onUserClicked,onDeleteClicked} from '../../controllers/adminAllTeamscontroller.js';
import {ChangeTag, onFireClick,onHireClick, onRemoveTaskClicked} from '../../controllers/adminSelectedTeamcontroller.js';
import {onSuccesfulFire, onSuccesfulHire} from '../../controllers/adminNewTeamController.js';


/**data=teams */
export default function createList(data,appendPoint){
    for(let team of data){
        const li = new HTMLTag('li');
        team = team.Team;
        if(team.teamname  && team.id){
            new HTMLTag('p').setText(team.teamname).append(li).onclick(()=>onTeamClicked(team));
            new HTMLTag('button').setText('X').append(li).onclick(()=>onDeleteClicked(team));
        }
        li.append(appendPoint);
    }
}

export function addNewMemberToExisting(user,appendPoint,team,tag){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{onHireClick(team,user)});
        new HTMLTag('p').setText(tag).addAttr('id','user-info-tag'+user.id).append(li);
        new HTMLTag('input').addAttr('type','text').addAttr('id','user-info-newtag'+user.id).append(li);
        new HTMLTag('button').setText('Tag frissít').append(li).onclick(()=>ChangeTag(user.id,team.id));
    }
    li.append(appendPoint);
}

export function addNonMemberToExisting(user,appendPoint,team){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{onFireClick(team,user)});
    }
    li.append(appendPoint);
}

export function createTeamProjectsList(tasks,appendpoint,teamid){
    appendpoint=document.getElementById('projectsList');
    for(let task of tasks){
        task = task.Task;
        const li = new HTMLTag('li').addAttr('id','teamtask'+task.id).append(appendpoint);
        new HTMLTag('p').setText(task.taskname).append(li).onclick(()=>onTaskClicked(task));
        new HTMLTag('button').setText('X').append(li).onclick(()=>onRemoveTaskClicked(task.id,teamid));
        
    }
}

export function addNewMemberToNew(user,appendPoint){
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id).addAttr('data-id',user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{onSuccesfulFire(user)});
        new HTMLTag('input').addAttr('type','text').addAttr('id','user-info-newtag'+user.id).addAttr('placeholder','Tag').append(li);
    }
    li.append(appendPoint);
}

export function addNonMemberToNew(user,appendPoint){
    console.log(user);
    appendPoint = document.getElementById('nonmembers');
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{onSuccesfulHire(user)});
    }
    li.append(appendPoint);
}

