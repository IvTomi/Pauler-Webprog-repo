import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent} from './mainSettings.js';

function createUserManagerView(){
    const content = refreshContent(1);
    new HTMLTag('p').setText('User manager works').append(content);
    //ez a rész majd egy listbuilderbe fog kerülni(és annyiszor ismétlődni, ahány alk. van)
    //nem kéne egy kereső?
    /*const formID= 'changeForm';
    const changeForm = new HTMLTag('form').addAttr('id',formID).append(content);

    new HTMLTag('p').setText('Régi jelszó').append(changeForm);
    new HTMLTag('input').addAttr('id',formID+'_oldpass').addAttr('name',formID+'_oldpass').addAttr('type','password').append(changeForm);
    new HTMLTag('p').setText('Új jelszó').append(changeForm);
    new HTMLTag('input').addAttr('id',formID+'_pass').addAttr('name',formID+'_pass').addAttr('type','password').append(changeForm);
    new HTMLTag('p').setText('Jelszó megerősítése').append(changeForm);
    new HTMLTag('input').addAttr('id',formID+'_passAgain').addAttr('name',formID+'_passAgain').addAttr('type','password').append(changeForm);
    */
   
    //jogosultságok felsorolása
}

export default createUserManagerView;

