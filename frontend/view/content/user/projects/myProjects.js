import {refreshContent,setUpListField} from './mainProject.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createMyProjectList from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'

function createMyProjectsView(){
    const content = refreshContent(0);

    let select = new HTMLTag('select').setText("asd").append(content);
    new HTMLTag('option').addAttr('value',0).setText('Érték választása').append(select);
    new HTMLTag('option').addAttr('value',1).setText('befejezett').append(select);
    new HTMLTag('option').addAttr('value',2).setText('folyamatban').append(select);
    new HTMLTag('option').addAttr('value',3).setText('mindennapos').append(select);

    const listDiv = setUpListField(content);
    createMyProjectList(new ProjectData().projectTestData,listDiv);


}

export default createMyProjectsView;