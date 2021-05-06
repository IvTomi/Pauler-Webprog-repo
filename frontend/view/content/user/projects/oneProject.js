import {refreshContent,setUpListField} from './mainProject.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProjectMembersList,createProjectRecordList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'


export function createOneProjectView(name,desc,data2,data){


    new HTMLTag('h1').setText(name).append(content);
    new HTMLTag('p').setText(desc).append(content);
    new HTMLTag('h3').setText('Tagok').append(content);
    new HTMLTag('h3').setText('Rekordok').append(content);

    console.log(data2); //records
    console.log(data); //users
    
    const listDiv = setUpListField(content);
    createProjectMembersList(data,listDiv);
    createProjectRecordList(data2,listDiv);

}

export default createOneProjectView;