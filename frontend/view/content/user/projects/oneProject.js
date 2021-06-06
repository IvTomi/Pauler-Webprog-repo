import {refreshContent,setUpListField} from './mainProject.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProjectMembersList,createProjectRecordList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'
import { getTaskAttributes, getTaskRecords } from '../../../../controllers/userOneProjectController.js';


export function createOneProjectView(taskid,name,desc){
    new HTMLTag('h1').setText(name).append(content);
    new HTMLTag('p').setText(desc).append(content);
    new HTMLTag('h3').setText('Tagok').append(content);
    const listDiv = new HTMLTag('div').append(content);
    getTaskAttributes(taskid,listDiv);
    new HTMLTag('h3').setText('Rekordok').append(content);
    const listDiv2 = new HTMLTag('div').append(content);
    //getTaskRecords(taskid,listDiv);
    
}

export default createOneProjectView;