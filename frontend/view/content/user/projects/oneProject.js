import {refreshContent,setUpListField} from './mainProject.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProjectMembersList,createProjectRecordList} from '../../../listBuilders/projectListBuilder.js'
import ProjectData from '../../../../datasets/projectData.js'


function createOneProjectView(){
    const content = refreshContent(2);

    new HTMLTag('h1').setText('Feladatnév').append(content);
    new HTMLTag('p').setText('Ezt a leírást is amúgy majd adatbázisból kell beolvasni').append(content);
    new HTMLTag('h3').setText('Tagok').append(content);
    new HTMLTag('h3').setText('Rekordok').append(content);

    const listDiv = setUpListField(content);
    createProjectMembersList(new ProjectData().projectTestData[0],listDiv);
    createProjectRecordList(new ProjectData().projectTestData[0],listDiv);

}

export default createOneProjectView;