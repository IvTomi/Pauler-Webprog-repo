import viewController from '../../../../controllers/viewController.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createMyProjectsView from './myProjects.js';
import createTeamProjectsView from './teamProjects.js';
import createOneProjectView from './oneProject.js'


function setUpUserProjectsViews(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(1,navList);//Selects the first element [which is the records] on user nav bar

    const selecter = new HTMLTag('ul').addAttr('id','selecter').append(appendPoint);
    new HTMLTag('div').addAttr('id','content').append(appendPoint);
    
    new HTMLTag('li').setText('Feladataim').append(selecter).onclick(createMyProjectsView);
    new HTMLTag('li').setText('Csapattagok feladatai').append(selecter).onclick(createTeamProjectsView);
    new HTMLTag('li').setText('egy feladat').append(selecter).onclick(createOneProjectView);

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


export default setUpUserProjectsViews;