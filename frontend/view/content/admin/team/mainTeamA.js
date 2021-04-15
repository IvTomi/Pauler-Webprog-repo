import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import listAllTeams from './allTeams.js';
import viewController from '../../../../controllers/viewController.js';
import makeNewTeamView from './newTeamA.js';

function setUpAdminTeamsView(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(2,navList);//Selects the first element [which is the records] on user nav bar

    const selecter=new HTMLTag('ul').addAttr('id','selecter').append(appendPoint);
    new HTMLTag('div').addAttr('id','content').append(appendPoint);
    
    new HTMLTag('li').setText('Csapatok').append(selecter).onclick(listAllTeams);
    new HTMLTag('li').setText('Csapat létrehozása').append(selecter).onclick(makeNewTeamView);

    listAllTeams();
}

export function setUpListField(appendPoint){
    let list = document.getElementById('list');
        if(list){
            new viewController().clearTag(list);
            return list;
        }
        else{
            list = document.createElement('ul');
            list.setAttribute('id','list');
            appendPoint.appendChild(list);
            return list;
        }
}

export function refreshContent(n){
    const selecters = document.getElementById('selecter');
    changeHighlithed(n,selecters);
    const content = document.getElementById('content');
    new viewController().clearTag(content);
    return content;
}

export default setUpAdminTeamsView;