import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createNewUserView from './CreateUser.js'
import CreateUserManagerView from './UserManager.js'
import viewController from '../../../../controllers/viewController.js';
import {router} from '../../../../index.js';

function setUpAdminSettingsView(appendPoint,n){
    const navList = document.querySelector('nav ul');
    changeHighlithed(1,navList);

    const selecter = new HTMLTag('ul').addAttr('id','selecter').append(appendPoint);
    new HTMLTag('div').addAttr('id','content').append(appendPoint);

    new HTMLTag('li').setText('Felhasználók kezelése').append(selecter).onclick(()=>{router.navigate('manageSettingsAdmin')});
    new HTMLTag('li').setText('Fiók létrehozása').append(selecter).onclick(()=>{router.navigate('newSettingsAdmin')});

    if(n === 0){
        CreateUserManagerView();
    }
    else if(n === 1){
        createNewUserView();
    }
     
}
export function refreshContent(n){
    const selecters = document.getElementById('selecter');
    changeHighlithed(n,selecters);
    const content = document.getElementById('content');
    new viewController().clearTag(content);
    return content;
}
export default setUpAdminSettingsView;