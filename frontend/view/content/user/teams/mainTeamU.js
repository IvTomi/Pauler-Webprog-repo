import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createmyTeamsView from './myTeamsU.js';
import { AllTeamList } from '../../../../controllers/userMyTeamsController.js';

function setUpUserTeamsView(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(2,navList);//Selects the third element [which is the teams] on user nav bar

    new HTMLTag('content').addAttr('id','content').append(appendPoint);
    
    AllTeamList();
    //createmyTeamsView();
}

export default setUpUserTeamsView