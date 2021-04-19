import viewController from '../controllers/viewController.js';
import HTMLTag from '../utilities/HTMLTag.js';

function createLogin(){
    const formID= 'loginForm';
    const loginForm = new HTMLTag('form').addAttr('id',formID).append(document.body);
    new HTMLTag('h2').setText('Bejelentkezés').append(loginForm);
    new HTMLTag('input').addAttr('id',formID+'_username').addAttr('name',formID+'_username').addAttr('placeholder','Felhasználónév').addAttr('type','text').append(loginForm);
    new HTMLTag('input').addAttr('id',formID+'_passwd').addAttr('name',formID+'_passwd').addAttr('placeholder','Jelszó').addAttr('type','password').append(loginForm);
    new HTMLTag('label').addAttr('for',formID+'_admin').setText('Bejelentkezés adminként: ').append(loginForm);
    new HTMLTag('input').addAttr('id',formID+'_admin').addAttr('name',formID+'_admin').addAttr('type','checkbox').append(loginForm);
    new HTMLTag('a').setText('Regisztráció').addAttr('href','').append(loginForm).onclick(new viewController().loadSignup);
    //TO REWRITE FUNCTION
    new HTMLTag('button').setText('Bejelentkezés').append(loginForm).onclick(new viewController().loadUser);
    //Creating link to signup
}

export default createLogin;