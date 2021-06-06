import {refreshContent,setUpListField} from './mainProject.js';
import {createMyProjectList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'
import { router } from '../../../../index.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';

function createMyProjectsView(data){
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/projectlist.css').append(document.body);
    console.log(data);
    const content = refreshContent(0);
    const listDiv = setUpListField(content);
    createMyProjectList(data,listDiv);
    
    
}

export default createMyProjectsView;