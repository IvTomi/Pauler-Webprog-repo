import viewController from '../controllers/viewController.js';
import HTMLTag from '../utilities/HTMLTag.js';

function createSignup(){
    const formID= 'signupForm';
    const signupForm = new HTMLTag('form').addAttr('id',formID).append(document.body);
    new HTMLTag('h2').setText('Regisztráció').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_company').addAttr('name',formID+'_company').addAttr('placeholder','Cég neve').addAttr('type','text').append(signupForm);
    
    new HTMLTag('input').addAttr('id',formID+'_username').addAttr('name',formID+'_username').addAttr('placeholder','Felhasználónév').addAttr('type','text').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_mail').addAttr('name',formID+'_mail').addAttr('placeholder','Email cím').addAttr('type','text').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_pass').addAttr('name',formID+'_pass').addAttr('placeholder','Jelszó').addAttr('type','password').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_passAgain').addAttr('name',formID+'_passAgain').addAttr('placeholder','Jelszó megerősítés').addAttr('type','password').append(signupForm);
    new HTMLTag('a').setText('Bejelentkezés').addAttr('href','').append(signupForm).onclick(new viewController().loadLogin);
    
    new HTMLTag('button').setText('Bejelentkezés').append(signupForm).onclick(new viewController().loadAdmin);
   
}

export default createSignup;