import viewController from '../../../../controllers/viewController.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createMyProjectsView from './myProjects.js';
import createOneProjectView from './oneProject.js'
import {router} from '../../../../index.js';
import { AllTaskList } from '../../../../controllers/userMyProjectsController.js';

function setUpUserProjectsViews(appendPoint,n){
    const navList = document.querySelector('nav ul');
    let mainContent = document.getElementById("MainContent");
    changeHighlithed(1,navList);//Selects the first element [which is the records] on user nav bar
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/contentbox.css').append(document.body);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/navigationbox.css').append(document.body);
    new HTMLTag('div').addAttr('id','content').append(mainContent);
    const selecter = new HTMLTag('ul').addAttr('id','selecter').append(mainContent);

    
    new HTMLTag('li').setText('Feladataim').append(selecter).onclick(()=>{router.navigate('myProjectsUser')}).preventDefaultEvent('click');

    if(n === 0){
        AllTaskList();
        //createMyProjectsView();
    }
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