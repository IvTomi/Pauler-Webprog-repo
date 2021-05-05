
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {setUpListField, refreshContent} from './mainTeamA.js';
import createList from '../../../listBuilders/adminTeamListBuilder.js';
import { SessionJanitor } from '../../../../utilities/sessionJanitor.js';

function listAllTeams(){
    const content = refreshContent(0);
    new HTMLTag('h2').setText('Csapatok').append(content);
    
    const list= setUpListField(content);
    createList(SessionJanitor.getAllTeams(()=>{SessionJanitor.getAllTeams(null)}),list);
}



export default listAllTeams;