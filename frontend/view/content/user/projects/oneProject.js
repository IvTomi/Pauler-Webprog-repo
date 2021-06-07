import {refreshContent,setUpListField} from './mainProject.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProjectMembersList,createProjectRecordList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'
import { router } from '../../../../index.js';
import { getTaskAttributes, getTaskRecords } from '../../../../controllers/userOneProjectController.js';


export function createOneProjectView(taskid,name,desc,appendPoint){

    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/projectcreate.css').append(document.body);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/recordlist.css').append(document.body);
    new HTMLTag('h1').setText(name).append(appendPoint);
    new HTMLTag('p').setText(desc).append(appendPoint);
    new HTMLTag('h3').setText('Tagok').append(appendPoint);
    const listDiv = new HTMLTag('div').addClass('listDiv').append(appendPoint);
    getTaskAttributes(taskid,listDiv);
    new HTMLTag('h3').setText('Rekordok').append(appendPoint);
    //const listDiv2 = new HTMLTag('div').append(appendPoint);
    getTaskRecords(taskid,appendPoint);
    
}

export default createOneProjectView;