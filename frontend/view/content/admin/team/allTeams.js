import teamData from '../../../../datasets/teamData.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { createAllTeamsList } from '../../../listBuilders/adminTeamListBuilder.js';
import {setUpListField, refreshContent} from './mainTeamA.js';

function listAllTeams(){
    const content = refreshContent(0);
    new HTMLTag('h2').setText('Csapatok').append(content);
    
    const list= setUpListField(content);
    createAllTeamsList(list,{});
}



export default listAllTeams;