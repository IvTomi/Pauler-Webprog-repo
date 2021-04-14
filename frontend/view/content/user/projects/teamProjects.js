import {refreshContent} from './mainProject.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';

function createTeamProjectsView(){
    const content = refreshContent(1);
    
    
    let select = new HTMLTag('select').setText("asd").append(content);
    new HTMLTag('option').addAttr('value',0).setText('Csapatnév').append(select);
    new HTMLTag('option').addAttr('value',1).setText('befejezett').append(select);
    new HTMLTag('option').addAttr('value',2).setText('folyamatban').append(select);
    new HTMLTag('option').addAttr('value',3).setText('mindennapos').append(select);

}

export default createTeamProjectsView;