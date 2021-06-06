import viewController from '../../../../controllers/viewController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { getUserTeams } from '../../../../controllers/userMyTeamsController.js';

function createmyTeamsView(){
    
    const content = document.getElementById('content');
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/teamlist.css').append(document.body);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText('Saját csapataim').append(content);
    let list = document.getElementById('list');
    if(list){
        new viewController().clearTag(list);
    }
    else{
        list = document.createElement('ul');
        list.setAttribute('id','list');
        content.appendChild(list);
    }
    getUserTeams();
    
}

export default createmyTeamsView;