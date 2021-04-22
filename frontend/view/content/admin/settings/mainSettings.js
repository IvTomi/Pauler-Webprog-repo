import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createNewUserView from './CreateUser.js'
import CreateUserManagerVieW from './UserManager.js'
import viewController from '../../../../controllers/viewController.js';

function setUpAdminSettingsView(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(3,navList);

    const selecter = new HTMLTag('ul').addAttr('id','selecter').append(appendPoint);
    new HTMLTag('div').addAttr('id','content').append(appendPoint);

    new HTMLTag('li').setText('Fiók létrehozása').append(selecter).onclick(createNewUserView);
    new HTMLTag('li').setText('Felhasználók kezelése').append(selecter).onclick(CreateUserManagerVieW);

}
export function refreshContent(n){
    const selecters = document.getElementById('selecter');
    changeHighlithed(n,selecters);
    const content = document.getElementById('content');
    new viewController().clearTag(content);
    return content;
}
export default setUpAdminSettingsView;