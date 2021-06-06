import ProjectData from '../../../../datasets/projectData.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';
import viewController from '../../../../controllers/viewController.js';
import {CreateOneProjectMemberList,CreateOneProjectNonMemberList,createProjectRecordList} from '../../../listBuilders/projectListBuilder.js';
import { deleteTask, makeRecords, memberDistribution, teamDistribution } from '../../../../controllers/adminOneTaskController.js';

function createOneProjectView(task){

    let project = task;
    const content = refreshContent(-1);
    new viewController().clearTag(content);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/projectcreate.css').append(document.body);

    new HTMLTag('h2').setText(project.taskname).append(content);
    new HTMLTag('p').setText(project.description).append(content);
    new HTMLTag('p').setText(project.deadline).append(content);

    let memberDiv = new HTMLTag('div').addAttr('class','memberDiv').append(content);  
    let memberCont = new HTMLTag('div').addAttr('class','memberCont').append(memberDiv);
    let nonmemberCont = new HTMLTag('div').addAttr('class','nonmemberCont').append(memberDiv);

    let teamdiv = new HTMLTag('div').addAttr('class','memberDiv').append(content);  
    let teammemberCont = new HTMLTag('div').addAttr('class','memberCont').append(teamdiv);
    let teamnonmemberCont = new HTMLTag('div').addAttr('class','nonmemberCont').append(teamdiv);

    new HTMLTag('h2').setText('Projecthez rendelt alkalmazottak').insertBefore(memberCont)
    new HTMLTag('h2').setText('Alkalmazott hozzárendelése').insertBefore(nonmemberCont)

    new HTMLTag('h2').setText('Projecthez rendelt csapatok').insertBefore(teammemberCont)
    new HTMLTag('h2').setText('Csapat hozzárendelése').insertBefore(teamnonmemberCont)

    const memList = new HTMLTag('ul').addAttr('id','members').append(memberCont);
    const nonMemList = new HTMLTag('ul').addAttr('id','nonmembers').append(nonmemberCont);
    const teamList = new HTMLTag('ul').addAttr('id','assigned-teams').append(teammemberCont);
    const nonTeamList = new HTMLTag('ul').addAttr('id','other-teams').append(teamnonmemberCont);
    memberDistribution(task.id);
    teamDistribution(task.id);
    new HTMLTag('p').setText('Rekordok').append(content);
    const recordList = new HTMLTag('ul').addAttr('id','records').append(content);
    makeRecords(task.id);
    new HTMLTag('button').setText('Projekt törlése').addAttr('class','deleteProjectBtn').append(content).onclick(()=>{deleteTask(task.id)});
}

export default createOneProjectView;