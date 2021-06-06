

import { createNonTeamMemberList, onCreate } from '../../../../controllers/adminNewTeamController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { SessionJanitor } from '../../../../utilities/sessionJanitor.js';
import { refreshContent} from './mainTeamA.js';


function makeNewTeamView(){
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/teamcreate.css').append(document.body);

    const content = refreshContent(1);
    new HTMLTag('h2').setText('Csapat létrehozása').append(content);
    new HTMLTag('input').addAttr('type','text').addAttr('id','teamname').addAttr('name','teamname').addAttr('placeholder','Name').append(content);

    new HTMLTag('input').addAttr('type','textarea').addAttr('id','desc').addAttr('name','desc').addAttr('placeholder','Description').append(content);
    

    let memberDiv = new HTMLTag('div').addAttr('class','memberDiv').append(content);   
    let memberCont = new HTMLTag('div').addAttr('class','memberCont').append(memberDiv);
    let nonmemberCont = new HTMLTag('div').addAttr('class','nonmemberCont').append(memberDiv);
    const selectedMembers = new HTMLTag('ul').addAttr('id','members').append(memberCont);
    new HTMLTag('h2').setText('Csapattagok').insertBefore(memberCont)
    const employees = new HTMLTag('ul').addAttr('id','nonmembers').append(nonmemberCont);
    new HTMLTag('h2').setText('Alkalmazott hozzáadása').insertBefore(nonmemberCont)
    //get list of all users
    SessionJanitor.getAllUsers(()=>{afterGotUsers( SessionJanitor.getAllUsers(null),content)});

    
}


function afterGotUsers(users,content){
    let employees = document.getElementById('nonmembers');
    createNonTeamMemberList(users,employees);
    new HTMLTag('button').addAttr('class','addBtn').setText('Létrehozás').append(content).onclick(onCreate);
}



export default makeNewTeamView;