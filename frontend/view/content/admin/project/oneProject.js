import ProjectData from '../../../../datasets/projectData.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';
import viewController from '../../../../controllers/viewController.js';
import {CreateOneProjectMemberList,CreateOneProjectNonMemberList,createProjectRecordList} from '../../../listBuilders/projectListBuilder.js';
import { deleteTask, makeRecords, memberDistribution } from '../../../../controllers/adminOneTaskController.js';

function createOneProjectView(task){

    let project = task;
    const content = refreshContent(-1);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(project.taskname).append(content);
    new HTMLTag('p').setText(project.description).append(content);
    new HTMLTag('p').setText(project.deadline).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    const memList = new HTMLTag('ul').addAttr('id','members').append(content);
    new HTMLTag('p').setText('Nem Tagok').append(content);
    const nonMemList = new HTMLTag('ul').addAttr('id','nonmembers').append(content);
    new HTMLTag('p').setText('Hozzárendelt Csapatok').append(content);
    const teamList = new HTMLTag('ul').addAttr('id','assigned-teams').append(content);
    new HTMLTag('p').setText('Többi csapat').append(content);
    const nonTeamList = new HTMLTag('ul').addAttr('id','other-teams').append(content);
    memberDistribution(task.id);
    new HTMLTag('p').setText('Rekordok').append(content);
    const recordList = new HTMLTag('ul').addAttr('id','records').append(content);
    makeRecords(task.id);
    new HTMLTag('button').setText('Projekt törlése').append(content).onclick(()=>{deleteTask(task.id)});
}

export default createOneProjectView;