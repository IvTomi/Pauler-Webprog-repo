import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createTeamMembersList, createTeamProjectsList} from '../../../listBuilders/teamListBuilder.js';
import viewController from '../../../../controllers/viewController.js';

function createUsersTeamInfoView(name,desc,members,projects){
    //team = new teamData().teamTestData[1];//Egyelőre fixen meg van adva melyik csapatot töltik be
    if(!(name && desc /*&& members && projects*/)){//A szükséges információk meglétének ellenőrzése
        return false;
    }

    const content = document.getElementById('content');
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(name).append(content);
    new HTMLTag('p').setText(desc).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    const memList = new HTMLTag('ul').addClass('members').append(content);
    createTeamMembersList(members.Users,memList,{});
    new HTMLTag('p').setText('Projektek').append(content);
    const projList = new HTMLTag('ul').addClass('projects').append(content); 
    createTeamProjectsList(projects.Tasks,projList,{});
}

export default createUsersTeamInfoView;