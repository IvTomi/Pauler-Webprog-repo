import viewController from '../controllers/viewController.js';
import HTMLTag from '../utilities/HTMLTag.js'

function createLogin(){
    const formID= 'loginForm';
    const loginForm = new HTMLTag('form').addAttr('id',formID).append(document.body);
    new HTMLTag('h2').setText('Bejelentkezés').append(loginForm);
    new HTMLTag('input').addAttr('id',formID+'_username').addAttr('name',formID+'_username').addAttr('placeholder','Felhasználónév').addAttr('type','text').append(loginForm);
    new HTMLTag('input').addAttr('id',formID+'_passwd').addAttr('name',formID+'_passwd').addAttr('placeholder','Jelszó').addAttr('type','password').append(loginForm);
    new HTMLTag('a').setText('Elfelejtette a jelszavát?').append(loginForm);
    //TO REWRITE FUNCTION
    new HTMLTag('button').setText('Bejelentkezés').append(loginForm).onclick(new viewController().loadAdminTop);
    //Creating link to signup
    const p = new HTMLTag('p').setText('Új az oldalon? ').append(document.body);
    new HTMLTag('a').addAttr('href','').setText('Hozzon létre fiókot').append(p)//.onclick(this.loadSignUp());
    p.pushText(' Ugye milyen jó?');
}

export default createLogin;