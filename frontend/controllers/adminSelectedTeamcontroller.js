import { router } from "../index.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import  { addNewMemberToExisting, addNonMemberToExisting, createTeamProjectsList } from "../view/listBuilders/adminTeamListBuilder.js";
import { getHeader } from '../utilities/sessionJanitor.js';



export function onTaskClicked(task){
    {sessionStorage.setItem('activeTask',JSON.stringify(task));
     console.log(sessionStorage.getItem('activeTask'));
      /*router.navigate('taskview')*/}
}

export function createTeamMembersList(team,appendPoint){
    console.log(team);
    makeRequest('/team/get/users','POST',getHeader(),JSON.stringify({"Teamid":team.id}),(data)=>{
        for(let member of data.Users){
            let user = member.User;
            let tag = member.Tag;
            addNewMemberToExisting(user,appendPoint,team,tag);
        }
    },()=>{alert('Hiba')});
    
}

export function ChangeTag(id,teamid){
    const tag = document.getElementById('user-info-newtag'+id).value; 
    console.log(teamid,id,tag);
    makeRequest('/team/modify/tag','POST',getHeader(),JSON.stringify({"TeamId":teamid,"Memberid":id,"Tag":tag}),(data)=>{onChangeTagSucces(data,id,tag)},()=>alert("Server not found"));
}

function onChangeTagSucces(data,id,tag){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        document.getElementById('user-info-tag'+id).textContent = tag;
        document.getElementById('user-info-newtag'+id).value = '';
    }
}



export function createNonTeamMemberList(users,team,appendpoint){
    let teamids = [];
    makeRequest('/team/get/users','POST',getHeader(),JSON.stringify({"Teamid":team.id}),(data)=>{
        for(let member of data.Users){
            let user = member.User;
            teamids.push(user.id);
        }
        for(let member of users){
            let user = member;
            if(!teamids.includes(user.id)){
                addNonMemberToExisting(user,appendpoint,team);
            }
        }
    },()=>{alert('Hiba')});
    
}

export function onFireClick(team, user){
    makeRequest('/team/add/user','POST',getHeader(),JSON.stringify({"Teamid":team.id,"Memberid":user.id}),(data)=>{onSuccesfulHire(data,user)},()=>(alert('Server not found')))
}

export function onHireClick(team, user){
    makeRequest('/team/remove/user','POST',getHeader(),JSON.stringify({"TeamId":team.id,"MemberId":user.id}),(data)=>{onSuccesfulFire(data,user)},()=>(alert('Server not found')))
}

 function onSuccesfulFire(data,user){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        const list = document.getElementById('members');
        list.removeChild(document.getElementById('user-info'+user.id));
        const otherList = document.getElementById('nonmembers');
        addNonMemberToExisting(user,otherList);
    }
}
function onSuccesfulHire(data,user){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        const list = document.getElementById('nonmembers');
        list.removeChild(document.getElementById('user-info'+user.id));
        const otherList = document.getElementById('members');
        addNewMemberToExisting(user,otherList);
    }
}
export function onRemoveTaskClicked(taskid,teamid){
    makeRequest('/team/remove/task','POST',getHeader(),JSON.stringify({"Taskid":taskid,"Teamid":teamid}),(data)=>{
        if(data.Status==='Failed'){
            alert(data.Message);
        }
        else{
            const list = document.getElementById('projectsList');
            list.removeChild(document.getElementById('teamtask'+taskid));
        }
    },()=>{alert('Server not found')})



} 

export function onDeleteClicked(team){
    console.log(team);
    makeRequest('/team/delete','POST',getHeader(),JSON.stringify({"TeamId":team.id}),(data)=>{onDeleteSucces(data)},()=>{alert('Server not found')})
}
function onDeleteSucces(data){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        router.navigate('teamsAdmin');
    }
}

export function getTeamTasks(teamid){
    console.log(teamid);
    makeRequest('/team/get/tasks','POST',getHeader(),JSON.stringify({"Teamid":teamid}),(data)=>{
        if(data.Status==='Failed'){
            alert(data.Message);
        }
        else{
            createTeamProjectsList(data.Tasks,{},teamid);
        }
    },()=>("Server not found"))
}