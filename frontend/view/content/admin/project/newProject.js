import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';
import {CreateOneProjectNonMemberList,CreateNewProjectNonTeamList} from '../../../listBuilders/projectListBuilder.js';
import ProjectData from '../../../../datasets/projectData.js';
import teamData from '../../../../datasets/teamData.js';
import { SessionJanitor } from '../../../../utilities/sessionJanitor.js';
import { addNonTaskedTeamsOnNew, addNonTaskedUserOnNew } from '../../../listBuilders/adminTaskListBuilder.js';
import { OnCreateTask } from '../../../../controllers/adminNewTaskController.js';

function makeNewProjectView(){
    const content = refreshContent(1);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/projectcreate.css').append(document.body);
    new HTMLTag('input').addAttr('placeholder','Project neve').addAttr('id','taskname').append(content);
    new HTMLTag('textarea').addAttr('placeholder','leírás').addAttr('id','taskdesc').append(content);
    new HTMLTag('p').setText('Project vége').append(content);
    new HTMLTag('input').addAttr('type','date').addAttr('id','deadline').append(content);
    //const added = new HTMLTag('ul').append(content); 
    new HTMLTag('h2').setText('Alkalmazottak és csapatok hozzáadása').append(content);
    let memberDiv = new HTMLTag('div').addAttr('class','memberDiv').append(content);  
    let memberCont = new HTMLTag('div').addAttr('class','memberCont').append(memberDiv);
    let nonmemberCont = new HTMLTag('div').addAttr('class','nonmemberCont').append(memberDiv);

    let teamdiv = new HTMLTag('div').addAttr('class','memberDiv').append(content);  
    let teammemberCont = new HTMLTag('div').addAttr('class','memberCont').append(teamdiv);
    let teamnonmemberCont = new HTMLTag('div').addAttr('class','nonmemberCont').append(teamdiv);

    //ide még jön egy olyan felsorolás, amiben csapatok és emberek is vannak
    new HTMLTag('h2').setText('Projecthez rendelt alkalmazottak').insertBefore(memberCont)
    new HTMLTag('h2').setText('Alkalmazott hozzárendelése').insertBefore(nonmemberCont)
    const Memlist = new HTMLTag('ul').addAttr('id','members').append(memberCont);
    const nonMemList = new HTMLTag('ul').addAttr('id','nonmembers').append(nonmemberCont);
    SessionJanitor.getAllUsers(()=>{
        let users = JSON.parse(sessionStorage.getItem('allUsers'));
        for(let user of users){
            addNonTaskedUserOnNew(user);
        }
    })
    const Teamlist = new HTMLTag('ul').addAttr('id','teams').append(teammemberCont);
    const nonTeamList = new HTMLTag('ul').addAttr('id','nonteams').append(teamnonmemberCont);
    new HTMLTag('h2').setText('Projecthez rendelt csapatok').insertBefore(teammemberCont)
    new HTMLTag('h2').setText('Csapat hozzárendelése').insertBefore(teamnonmemberCont)
    SessionJanitor.getAllTeams(()=>{
        let teams = JSON.parse(sessionStorage.getItem('allTeams'));
        for(let team of teams){
            addNonTaskedTeamsOnNew(team.Team);
        }
    })
    new HTMLTag('button').setText('Létrehozás').addAttr('class','addBtn').append(content).onclick(()=>{OnCreateTask()});
}

export default makeNewProjectView;