
import teamData from '../../../../datasets/teamData.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { createTeamMembersList } from '../../../listBuilders/teamListBuilder.js';
import { refreshContent} from './mainTeamA.js';

function makeNewTeamView(){
    const content = refreshContent(1);
    new HTMLTag('h2').setText('Csapat létrehozása').append(content);

    new HTMLTag('input').addAttr('type','textarea').addAttr('id','desc').addAttr('name','desc').append(content);
    const selectedMembers = new HTMLTag('ul').append(content);
    createTeamMembersList(new teamData().nonTeamMembers,selectedMembers,{btnLbl:'Törlés'});
    const employees = new HTMLTag('ul').append(content);
    createTeamMembersList(new teamData().nonTeamMembers,employees,{btnLbl:'Hozzáadás'});
    new HTMLTag('button').setText('Létrehozás').append(content)
}

export default makeNewTeamView;