import HTMLTag from '../../../../utilities/HTMLTag.js';
import { createTeamMembersList, createTeamProjectsList} from '../../../listBuilders/teamListBuilder.js';
import viewController from '../../../../controllers/viewController.js';
import teamData from '../../../../datasets/teamData.js';
import { refreshContent } from './mainTeamA.js';

function createTeamInfoView(team){
    
    if(!(team.TeamName && team.Description && team.TeamMembers && team.TeamTasks)){//A szükséges információk meglétének ellenőrzése
        return false;
    }
    const content = refreshContent(-1);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(team.TeamName).append(content);
    new HTMLTag('p').setText(team.Description).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    const memList = new HTMLTag('ul').addClass('members').append(content);
    createTeamMembersList(team.TeamMembers,memList,{admin:true});
    const nonMemList = new HTMLTag('ul').addClass('nonmembers').append(content);
    createTeamMembersList(new teamData().nonTeamMembers,nonMemList,{btnLbl: 'Hozzáad'})
    new HTMLTag('p').setText('Projektek').append(content);
    const projList = new HTMLTag('ul').addClass('projects').append(content); 
    createTeamProjectsList(team.TeamTasks,projList);
    new HTMLTag('button').setText('Csapat törlése').append(content);
}


export default createTeamInfoView;