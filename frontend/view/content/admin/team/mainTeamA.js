import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import listAllTeams from './allTeams.js';
import viewController from '../../../../controllers/viewController.js';
import makeNewTeamView from './newTeamA.js';
import {router} from '../../../../index.js';
import createTeamInfoView from './oneTeamA.js';

function setUpAdminTeamsView(appendPoint,n){
    let mainContent = document.getElementById("MainContent");
    const navList = document.querySelector('nav ul');
    changeHighlithed(2,navList);//Selects the first element [which is the records] on user nav bar
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/contentbox.css').append(document.body);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/navigationbox.css').append(document.body);

   
    new HTMLTag('div').addAttr('id','content').append(mainContent);
    const selecter=new HTMLTag('ul').addAttr('id','selecter').append(mainContent);
    
    new HTMLTag('li').setText('Csapatok').append(selecter).onclick(()=>{router.navigate('teamsAdmin')});
    new HTMLTag('li').setText('Csapat létrehozása').append(selecter).onclick(()=>{router.navigate('newTeamAdmin')});
    if(n===0){
        listAllTeams();
    }
    else if(n===1){
        makeNewTeamView();
    }  
    else if(n===2){

        let team = JSON.parse(sessionStorage.getItem('activeTeam'));
        console.log(team);
        createTeamInfoView(team);
    }  
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