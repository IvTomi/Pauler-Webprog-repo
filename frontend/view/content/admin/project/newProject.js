import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';
import {CreateOneProjectNonMemberList,CreateNewProjectNonTeamList} from '../../../listBuilders/projectListBuilder.js';
import ProjectData from '../../../../datasets/projectData.js';
import teamData from '../../../../datasets/teamData.js';

function makeNewProjectView(){
    const content = refreshContent(1);
    new HTMLTag('input').addAttr('placeholder','Project neve').append(content);
    new HTMLTag('textarea').addAttr('placeholder','leírás').append(content);
    new HTMLTag('p').setText('Project vége').append(content);
    new HTMLTag('input').addAttr('type','date').append(content);
    const added = new HTMLTag('ul').append(content);
    //ide még jön egy olyan felsorolás, amiben csapatok és emberek is vannak
    new HTMLTag('p').setText('Alkalmazottak és csapatok hozzáadása').append(content);
    const nonMemList = new HTMLTag('ul').addClass('nonmembers').append(content);
    CreateOneProjectNonMemberList(new ProjectData().nonProjectMembers,nonMemList);
    const nonTeamList = new HTMLTag('ul').addClass('nonteams').append(content);
    CreateNewProjectNonTeamList(new teamData().teamTestData,nonTeamList);
    new HTMLTag('button').setText('Létrehozás').append(content);
}

export default makeNewProjectView;