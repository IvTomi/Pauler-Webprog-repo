import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';
import {createAllProjectList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js';

function createAllProjectsView(){
    const content = refreshContent(0);
    
    const listDiv = setUpListField(content);
    createAllProjectList(new ProjectData().projectTestData,listDiv);
}

export default createAllProjectsView;