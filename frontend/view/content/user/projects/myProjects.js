import {refreshContent,setUpListField} from './mainProject.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createMyProjectList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'

function createMyProjectsView(){
    const content = refreshContent(0);

    let mySelect = new HTMLTag('select').addAttr('id','mySelect').append(content);
    new HTMLTag('option').addAttr('value',0).setText('Érték választása').append(mySelect);
    new HTMLTag('option').addAttr('value',1).setText('befejezett').append(mySelect);
    new HTMLTag('option').addAttr('value',2).setText('folyamatban').append(mySelect);
    new HTMLTag('option').addAttr('value',3).setText('mindennapos').append(mySelect);

    mySelect.addEventListener('change', myProjectUpdate);

    
}

function myProjectUpdate(){
    const listDiv = setUpListField(content);
    createMyProjectList(new ProjectData().projectTestData,listDiv,mySelect.value);
}

export default createMyProjectsView;