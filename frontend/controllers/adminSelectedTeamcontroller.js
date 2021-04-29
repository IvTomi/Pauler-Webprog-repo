import { router } from "../index.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import createList, { addNewMemberToExisting, addNonMemberToExisting, getDummyData } from "../view/listBuilders/adminTeamListBuilder.js";
import { getHeader } from "./logincontroller.js";



export function onTaskClicked(task){
    {sessionStorage.setItem('activeTask',JSON.stringify(task));
     console.log(sessionStorage.getItem('activeTask'));
      /*router.navigate('taskview')*/}
}

export function createTeamMembersList(team,appendPoint){
    for(let member of team.TeamMembers){
        let user = member.User;
        addNewMemberToExisting(user,appendPoint,team);
    }
}





export function createNonTeamMemberList(users,team,appendpoint){
    const teamids = [];
    for(let member of team.TeamMembers){
        let user = member.User;
        teamids.push(user.Id);
    }
    for(let member of users){
        let user = member.User;
        if(!teamids.includes(user.Id)){
            addNonMemberToExisting(user,appendpoint,team);
        }
    }
}

export function onFireClick(team, user){
    makeRequest('/team/add/user','GET',getHeader(),JSON.stringify({"teamid":team.Id,"userid":user.Id}),(data)=>{onSuccesfulHire(data,user)},()=>(alert('Server not found')))
}

export function onHireClick(team, user){
    makeRequest('/team/remove/user','GET',getHeader(),JSON.stringify({"teamid":team.Id,"userid":user.Id}),(data)=>{onSuccesfulFire(data,user)},()=>(alert('Server not found')))
}

 function onSuccesfulFire(data,user){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        const list = document.getElementById('members');
        list.removeChild(document.getElementById('user-info'+user.Id));
        const otherList = document.getElementById('nonmembers');
        addNonMemberToExisting(user,otherList);
    }
}
function onSuccesfulHire(data,user){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        const list = document.getElementById('nonmembers');
        list.removeChild(document.getElementById('user-info'+user.Id));
        const otherList = document.getElementById('members');
        addNewMemberToExisting(user,otherList);
    }
}

export function onDeleteClicked(){
    makeRequest('/team/remove','POST',getHeader(),JSON.stringify({"teamid":team.Id}),(data)=>{onDeleteSucces(data)},()=>{alert('Server not found')})
}
function onDeleteSucces(data){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        router.navigate('teamsAdmin');
    }
}