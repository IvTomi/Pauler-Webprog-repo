import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import viewController from '../../../../controllers/viewController.js';
import makeNewProjectView from '../project/newProject.js';
import createAllProjectsView from './allProjects.js';
import createOneProjectView from './oneProject.js';


function setUpAdminProjectsView(appendPoint){

    const navList = document.querySelector('nav ul');
    changeHighlithed(1,navList);

    const selecter = new HTMLTag('ul').addAttr('id','selecter').append(appendPoint);
    new HTMLTag('div').addAttr('id','content').append(appendPoint);

    new HTMLTag('li').setText('Meglévő projektek').append(selecter).onclick(createAllProjectsView);
    new HTMLTag('li').setText('projekt létrehozása').append(selecter).onclick(makeNewProjectView);
    new HTMLTag('li').setText('egy projekt').append(selecter).onclick(createOneProjectView);
    
}
export function refreshContent(n){
    const selecters = document.getElementById('selecter');
    changeHighlithed(n,selecters);
    const content = document.getElementById('content');
    new viewController().clearTag(content);
    return content;
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

export default setUpAdminProjectsView;