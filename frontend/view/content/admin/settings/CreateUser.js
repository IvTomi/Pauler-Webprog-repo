import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent} from './mainSettings.js';


function createNewUserView(){
    const content = refreshContent(0);
    
    const formID= 'createForm';
    const createForm = new HTMLTag('form').addAttr('id',formID).append(content);
    new HTMLTag('p').setText('Felhasználónév').append(createForm);
    new HTMLTag('input').addAttr('id',formID+'_username').addAttr('name',formID+'_username').addAttr('type','text').append(createForm);
    new HTMLTag('p').setText('E-mail cím').append(createForm);
    new HTMLTag('input').addAttr('id',formID+'_mail').addAttr('name',formID+'_mail').addAttr('type','text').append(createForm);
    new HTMLTag('p').setText('Jelszó').append(createForm);
    new HTMLTag('input').addAttr('id',formID+'_pass').addAttr('name',formID+'_pass').addAttr('type','password').append(createForm);
    new HTMLTag('p').setText('Jelszó megerősítése').append(createForm);
    new HTMLTag('input').addAttr('id',formID+'_passAgain').addAttr('name',formID+'_passAgain').addAttr('type','password').append(createForm);
    
    //jogosultságok felsorolása
}

export default createNewUserView;

