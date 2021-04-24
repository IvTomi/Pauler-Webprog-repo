import HTMLTag from '../../../../utilities/HTMLTag.js';
import viewController from '../../../../controllers/viewController.js';
import { refreshContent } from './mainTeamA.js';
import { makeRequest } from '../../../../utilities/serviceHandler.js';
import { getHeader } from '../../../../controllers/logincontroller.js';
import {router} from '../../../../index.js';



function createTeamInfoView(team){
    
    if(!(team.TeamName && team.Description && team.TeamMembers && team.TeamTasks)){//A szükséges információk meglétének ellenőrzése
        return false;
    }
    const content = refreshContent(-1);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(team.TeamName).append(content);
    new HTMLTag('p').setText(team.Description).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    const memList = new HTMLTag('ul').addAttr('id','members').append(content);
    memList.node.style.background='red';
    createTeamMembersList(team,memList);
    const nonMemList = new HTMLTag('ul').addAttr('id','nonmembers').append(content);
    //get list of all users
    let users = [{
        User:{
            Id:11,
            Username: 'nagypeti',
            FirstName: 'Péter',
            LastName: 'Nagy'
        },
        Tag:'#captain'
    },
    {
        User:{
            Id:12,
            Username: 'kisspetra',
            FirstName: 'Petra',
            LastName: 'Kiss'
        },
        Tag:'#design'
    },
    {
        User:{
            Id:13,
            Username: 'feszes',
            FirstName: 'Gábor',
            LastName: 'Feszes'
        },
        Tag:'#muscle'
    },
    {
        User:{
            Id:18,
            Username: 'dragonqueen',
            FirstName: 'Anna',
            LastName: 'Szabó'
        },
        Tag:'#weight'
    },
    {
        User:{
            Id:20,
            Username: 'boss',
            FirstName: 'György',
            LastName: 'Baila'
        },
        Tag:'#boss'
    }];
    createNonTeamMemberList(users,team,nonMemList)
    new HTMLTag('p').setText('Projektek').append(content);
    const projList = new HTMLTag('ul').addClass('projects').append(content); 
    createTeamProjectsList(team,projList);
    new HTMLTag('button').setText('Csapat törlése').append(content).onclick(()=>{makeRequest('/team/remove','POST',getHeader(),JSON.stringify({"teamid":team.Id}),(data)=>{onDeleteSucces(data)},()=>{alert('Server not found')})});
}

function createTeamProjectsList(team,appendpoint){
    for(let task of team.TeamTasks){
        const li = new HTMLTag('li').setText(task.TaskName).append(appendpoint).onclick(()=>{sessionStorage.setItem('activeTask',JSON.stringify(task)); console.log(sessionStorage.getItem('activeTask')); /*router.navigate('taskview')*/});
        
    }
}

function createTeamMembersList(team,appendPoint){
    for(let member of team.TeamMembers){
        let user = member.User;
        addNewMember(user,appendPoint,team);
    }
}



function addNewMember(user,appendPoint,team){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.Id);
    if(user.FirstName && user.LastName && user.Id){
        new HTMLTag('p').setText(user.LastName+' '+user.FirstName).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{makeRequest('/team/remove/user','GET',getHeader(),JSON.stringify({"teamid":team.Id,"userid":user.Id}),(data)=>{onSuccesfulFire(data,user)},()=>(alert('Server not found')))});
    }
    li.append(appendPoint);
}

function createNonTeamMemberList(users,team,appendpoint){
    const teamids = [];
    for(let member of team.TeamMembers){
        let user = member.User;
        teamids.push(user.Id);
    }
    for(let member of users){
        let user = member.User;
        if(!teamids.includes(user.Id)){
            addNonMember(user,appendpoint,team);
        }
    }
}

function addNonMember(user,appendPoint,team){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.Id);
    if(user.FirstName && user.LastName && user.Id){
        new HTMLTag('p').setText(user.LastName+' '+user.FirstName).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{makeRequest('/team/add/user','GET',getHeader(),JSON.stringify({"teamid":team.Id,"userid":user.Id}),(data)=>{onSuccesfulHire(data,user)},()=>(alert('Server not found')))});
    }
    li.append(appendPoint);
}


function onSuccesfulFire(data,user){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        const list = document.getElementById('members');
        list.removeChild(document.getElementById('user-info'+user.Id));
        const otherList = document.getElementById('nonmembers');
        addNonMember(user,otherList);
    }
}
function onSuccesfulHire(data,user){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        console.log(user);
        const list = document.getElementById('nonmembers');
        list.removeChild(document.getElementById('user-info'+user.Id));
        const otherList = document.getElementById('members');
        addNewMember(user,otherList);
    }
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

export default createTeamInfoView;