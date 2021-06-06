import {refreshContent,setUpListField} from './mainProject.js';
import {createMyProjectList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'
import { router } from '../../../../index.js';

function createMyProjectsView(data){
    console.log(data);
    const content = refreshContent(0);
    const listDiv = setUpListField(content);
    createMyProjectList(data,listDiv);
    
}

export default createMyProjectsView;