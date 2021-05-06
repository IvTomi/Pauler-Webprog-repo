import viewController from '../../../../controllers/viewController.js';
import {createMyTeamsList} from '../../../listBuilders/teamListBuilder.js';
import teamData from '../../../../datasets/teamData.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { router } from '../../../../index.js';

function createmyTeamsView(data){
    
    const content = document.getElementById('content');
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
    //if(data.iterable){
        createMyTeamsList(data,list,{});
    //};
    
}

export default createmyTeamsView;