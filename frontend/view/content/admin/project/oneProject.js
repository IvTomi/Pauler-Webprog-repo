import ProjectData from '../../../../datasets/projectData.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';
import viewController from '../../../../controllers/viewController.js';
import {CreateOneProjectMemberList,CreateOneProjectNonMemberList,createProjectRecordList} from '../../../listBuilders/projectListBuilder.js';

function createOneProjectView(){

    const project = new ProjectData().projectTestData[0];
    const nonMembers = new ProjectData().nonProjectMembers;
    const content = refreshContent(-1);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(project.name).append(content);
    new HTMLTag('p').setText(project.description).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    const memList = new HTMLTag('ul').addClass('members').append(content);
    CreateOneProjectMemberList(project.members,memList);
    const nonMemList = new HTMLTag('ul').addClass('nonmembers').append(content);
    CreateOneProjectNonMemberList(nonMembers,nonMemList);
    new HTMLTag('p').setText('Rekordok').append(content);
    const recordList = new HTMLTag('ul').addClass('records').append(content);
    createProjectRecordList(new ProjectData().projectTestData[0],recordList)
    new HTMLTag('button').setText('Projekt törlése').append(content);
}

export default createOneProjectView;