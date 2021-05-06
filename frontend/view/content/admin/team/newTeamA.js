

import { createNonTeamMemberList, onCreate } from '../../../../controllers/adminNewTeamController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { SessionJanitor } from '../../../../utilities/sessionJanitor.js';
import { refreshContent} from './mainTeamA.js';

function makeNewTeamView(){
    const content = refreshContent(1);
    new HTMLTag('h2').setText('Csapat létrehozása').append(content);
    new HTMLTag('input').addAttr('type','text').addAttr('id','teamname').addAttr('name','teamname').addAttr('placeholder','Name').append(content);

    new HTMLTag('input').addAttr('type','textarea').addAttr('id','desc').addAttr('name','desc').addAttr('placeholder','Description').append(content);
    const selectedMembers = new HTMLTag('ul').addAttr('id','members').append(content);
    selectedMembers.node.style.background = 'red';
    const employees = new HTMLTag('ul').addAttr('id','nonmembers').append(content);
    //get list of all users
    SessionJanitor.getAllUsers(()=>{afterGotUsers( SessionJanitor.getAllUsers(null))});
    /*let users = [ {
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
];*/
    
}


function afterGotUsers(users){
    let employees = document.getElementById('nonmembers');
    createNonTeamMemberList(users,employees);
    new HTMLTag('button').setText('Létrehozás').append(content).onclick(onCreate);
}



export default makeNewTeamView;