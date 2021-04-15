import HTMLTag from '../../../../utilities/HTMLTag.js';
import { createTeamMembersList, createTeamProjectsList} from '../../../listBuilders/teamListBuilder.js';
import viewController from '../../../../controllers/viewController.js';
import teamData from '../../../../datasets/teamData.js';
import { refreshContent } from './mainTeamA.js';

function createTeamInfoView(team){
    
    team = new teamData().teamTestData[1];//Egyelőre fixen meg van adva melyik csapatot töltik be
    if(!(team.name && team.desc && team.members && team.projects)){//A szükséges információk meglétének ellenőrzése
        return false;
    }
    const content = refreshContent(-1);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(team.name).append(content);
    new HTMLTag('p').setText(team.desc).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    const memList = new HTMLTag('ul').addClass('members').append(content);
    createTeamMembersList(team.members,memList,{admin:true});
    const nonMemList = new HTMLTag('ul').addClass('nonmembers').append(content);
    createTeamMembersList(new teamData().nonTeamMembers,nonMemList,{btnLbl: 'Hozzáad'})
    new HTMLTag('p').setText('Projektek').append(content);
    const projList = new HTMLTag('ul').addClass('projects').append(content); 
    createTeamProjectsList(team.projects,projList);
    new HTMLTag('button').setText('Csapat törlése').append(content);
}


export default createTeamInfoView;