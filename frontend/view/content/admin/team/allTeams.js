
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { createAllTeamsList } from '../../../../controllers/adminAllTeamscontroller.js';
import {setUpListField, refreshContent} from './mainTeamA.js';

function listAllTeams(){
    const content = refreshContent(0);
    new HTMLTag('h2').setText('Csapatok').append(content);
    
    const list= setUpListField(content);
    createAllTeamsList(list,{});
}



export default listAllTeams;