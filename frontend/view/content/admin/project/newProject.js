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
    new HTMLTag('input').addAttr('placeholder','Project neve').addAttr('id','taskname').append(content);
    new HTMLTag('textarea').addAttr('placeholder','leírás').addAttr('id','taskdesc').append(content);
    new HTMLTag('p').setText('Project vége').append(content);
    new HTMLTag('input').addAttr('type','date').addAttr('id','deadline').append(content);
    const added = new HTMLTag('ul').append(content);
    //ide még jön egy olyan felsorolás, amiben csapatok és emberek is vannak
    new HTMLTag('p').setText('Alkalmazottak és csapatok hozzáadása').append(content);
    const Memlist = new HTMLTag('ul').addAttr('id','members').append(content);
    const nonMemList = new HTMLTag('ul').addAttr('id','nonmembers').append(content);
    SessionJanitor.getAllUsers(()=>{
        let users = JSON.parse(sessionStorage.getItem('allUsers'));
        for(let user of users){
            addNonTaskedUserOnNew(user);
        }
    })
    const Teamlist = new HTMLTag('ul').addAttr('id','teams').append(content);
    const nonTeamList = new HTMLTag('ul').addAttr('id','nonteams').append(content);
    SessionJanitor.getAllTeams(()=>{
        let teams = JSON.parse(sessionStorage.getItem('allTeams'));
        for(let team of teams){
            addNonTaskedTeamsOnNew(team.Team);
        }
    })
    new HTMLTag('button').setText('Létrehozás').append(content).onclick(()=>{OnCreateTask()});
}

export default makeNewProjectView;