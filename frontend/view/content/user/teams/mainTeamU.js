import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createmyTeamsView from './myTeamsU.js';
import createUsersTeamInfoView from './oneTeamU.js';
import {router} from '../../../../index.js'

function setUpUserTeamsView(appendPoint,n){
    const navList = document.querySelector('nav ul');
    changeHighlithed(2,navList);//Selects the third element [which is the teams] on user nav bar
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/contentbox.css').append(document.body);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/navigationbox.css').append(document.body);
    let mainContent = document.getElementById("MainContent");
    new HTMLTag('content').addAttr('id','content').append(mainContent);

    const selecter=new HTMLTag('ul').addAttr('id','selecter').append(mainContent);

    new HTMLTag('li').setText('Csapataim').append(selecter).onclick(()=>{router.navigate('myTeamsUser')});
    
    if(n===0){
        createmyTeamsView();
    }
    if(n===1){
        console.log(sessionStorage.getItem('activeTeam'));
        let team = /*JSON.parse( JSON.stringify( */JSON.parse(sessionStorage.getItem('activeTeam')) /*) )*/;
        createUsersTeamInfoView(team);
    }

}

export default setUpUserTeamsView