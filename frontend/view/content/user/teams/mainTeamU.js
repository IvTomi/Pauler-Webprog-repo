import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createmyTeamsView from './myTeamsU.js';
import createUsersTeamInfoView from './oneTeamU.js';

function setUpUserTeamsView(appendPoint,n){
    const navList = document.querySelector('nav ul');
    changeHighlithed(2,navList);//Selects the third element [which is the teams] on user nav bar

    new HTMLTag('content').addAttr('id','content').append(appendPoint);
    
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