
import { getHeader } from '../../../../controllers/logincontroller.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { makeRequest } from '../../../../utilities/serviceHandler.js';
import { refreshContent} from './mainTeamA.js';
import {router} from '../../../../index.js';

function makeNewTeamView(){
    const content = refreshContent(1);
    new HTMLTag('h2').setText('Csapat létrehozása').append(content);
    new HTMLTag('input').addAttr('type','text').addAttr('id','teamname').addAttr('name','teamname').addAttr('placeholder','Name').append(content);

    new HTMLTag('input').addAttr('type','textarea').addAttr('id','desc').addAttr('name','desc').addAttr('placeholder','Description').append(content);
    const selectedMembers = new HTMLTag('ul').addAttr('id','members').append(content);
    selectedMembers.node.style.background = 'red';
    const employees = new HTMLTag('ul').addAttr('id','nonmembers').append(content);
    //get list of all users
    let users = [ {
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
    }
];
    createNonTeamMemberList(users,employees);
    new HTMLTag('button').setText('Létrehozás').append(content).onclick(onCreate);
}


function onCreate(){
    const memberids = [];
    const members = document.getElementById('members');
    for(let element of members.children){
        memberids.push(element.dataset.id);
    }
    const name = document.getElementById('teamname').value;
    const desc = document.getElementById('desc').value;
    makeRequest('/team/create','POST',getHeader(),JSON.stringify({"Name":name,"Description":desc,"Ids":memberids}),(data)=>{onCreateSucces(data),alert('Serve not found')})
    console.log(memberids);
}

function onCreateSucces(data){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        router.navigate('teamsAdmin');
    }
}


function addNewMember(user,appendPoint){
    const li = new HTMLTag('li').addAttr('id','user-info'+user.Id).addAttr('data-id',user.Id);
    if(user.FirstName && user.LastName && user.Id){
        new HTMLTag('p').setText(user.LastName+' '+user.FirstName).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{onSuccesfulFire(user)});
    }
    li.append(appendPoint);
}

function createNonTeamMemberList(users,appendpoint){
    for(let member of users){
        let user = member.User;
        addNonMember(user,appendpoint);
    }
}

function addNonMember(user,appendPoint){
    const li = new HTMLTag('li').addAttr('id','user-info'+user.Id);
    if(user.FirstName && user.LastName && user.Id){
        new HTMLTag('p').setText(user.LastName+' '+user.FirstName).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{onSuccesfulHire(user)});
    }
    li.append(appendPoint);
}


function onSuccesfulFire(user){
    console.log(user);
    const list = document.getElementById('members');
    list.removeChild(document.getElementById('user-info'+user.Id));
    const otherList = document.getElementById('nonmembers');
    addNonMember(user,otherList);
}
function onSuccesfulHire(user){
    console.log(user);
    const list = document.getElementById('nonmembers');
    list.removeChild(document.getElementById('user-info'+user.Id));
    const otherList = document.getElementById('members');
    addNewMember(user,otherList);
}


export default makeNewTeamView;