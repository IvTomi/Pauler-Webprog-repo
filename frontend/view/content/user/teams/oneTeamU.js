import HTMLTag from '../../../../utilities/HTMLTag.js';
import viewController from '../../../../controllers/viewController.js';
import { createTeamMemberList } from '../../../listBuilders/userTeamListBuilder.js';
import {getTeamTasks, getTeamUsers} from '../../../../controllers/userOneTeamController.js';

function createUsersTeamInfoView(team){
    
    const content = document.getElementById('content');
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/teamcreate.css').append(document.body);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(team.teamname).append(content);
    new HTMLTag('p').setText(team.description).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    let memberDiv = new HTMLTag('div').addAttr('class','memberDiv').append(content); 
    const memList = new HTMLTag('ul').addAttr('id','members').append(memberDiv);
    getTeamUsers(team.id);
    new HTMLTag('p').setText('Projektek').append(content);
    const projList = new HTMLTag('ul').addAttr('id','projects').addAttr('class','projectsList').append(content); 
    getTeamTasks(team.id);
}

export default createUsersTeamInfoView;