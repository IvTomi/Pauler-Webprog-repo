import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import viewController from '../../../../controllers/viewController.js';
import makeNewProjectView from '../project/newProject.js';
import createAllProjectsView from './allProjects.js';
import createOneProjectView from './oneProject.js';
import { router } from '../../../../index.js';


function setUpAdminProjectsView(appendPoint,n ){

    const navList = document.querySelector('nav ul');
    changeHighlithed(1,navList);

    const selecter = new HTMLTag('ul').addAttr('id','selecter').append(appendPoint);
    new HTMLTag('div').addAttr('id','content').append(appendPoint);

    new HTMLTag('li').setText('Meglévő projektek').append(selecter).onclick(()=>{router.navigate('alltaskAdmin')});
    new HTMLTag('li').setText('projekt létrehozása').append(selecter).onclick(()=>{router.navigate('newtaskAdmin')});
    new HTMLTag('li').setText('egy projekt').append(selecter).onclick(()=>{router.navigate('onetaskAdmin')});

    if(n===0){
        makeNewProjectView();
    }
    if(n===1){
        createAllProjectsView();
    }
    if(n===2){
        let tojson = sessionStorage.getItem('activeTask');
        console.log(tojson);
        let task = JSON.parse(tojson);//JSON.parse(JSON.stringify(JSON.parse()));
        createOneProjectView(task);
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

export default setUpAdminProjectsView;