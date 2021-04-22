import {refreshContent,setUpListField} from './mainProject.js';
import {createMyProjectList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'

function createMyProjectsView(){
    const content = refreshContent(0);

    const listDiv = setUpListField(content);
    createMyProjectList(new ProjectData().projectTestData,listDiv);
    
    
}

export default createMyProjectsView;