import HTMLTag from '../utilities/HTMLTag.js';
import {router} from '../index.js';
import {setSessionHash} from '../controllers/logincontroller.js';
import {clearSessionHash} from '../controllers/logincontroller.js';
import {sendLogIn} from '../controllers/logincontroller.js';


export function createLogin(){
    const formID= 'loginForm';
    const loginForm = new HTMLTag('form').addAttr('id',formID).addAttr('class',formID).append(document.body);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/loginpanel.css').append(document.body);
    new HTMLTag('h2').setText('Bejelentkezés').append(loginForm);
    new HTMLTag('input').addAttr('id',formID+'_username').addAttr('name',formID+'_username').addAttr('placeholder','Felhasználónév').addAttr('type','text').append(loginForm);
    new HTMLTag('input').addAttr('id',formID+'_passwd').addAttr('name',formID+'_passwd').addAttr('placeholder','Jelszó').addAttr('type','password').append(loginForm);
    new HTMLTag('label').addAttr('for',formID+'_admin').setText('Bejelentkezés adminként: ').append(loginForm);  
    new HTMLTag('input').addAttr('id',formID+'_admin').addAttr('class','cb').addAttr('name',formID+'_admin').addAttr('type','checkbox').append(loginForm);
    new HTMLTag('a').setText('Cég azonosító megadása').addAttr('href','').append(loginForm).onclick(()=>{clearSessionHash()});
    new HTMLTag('a').setText('Regisztráció').addAttr('href','').append(loginForm).onclick(()=>{router.navigate('register')}).preventDefaultEvent('click');
    //TO REWRITE FUNCTION
    new HTMLTag('button').setText('Bejelentkezés').append(loginForm).onclick(()=>{
        sendLogIn();
    }).preventDefaultEvent('click');
    //Creating link to signup
}

export function createHashInputView(){
    const formID= 'hashForm';
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/loginpanel.css').append(document.body);
    const hashForm = new HTMLTag('form').addAttr('id',formID).addAttr('class','loginForm').append(document.body);
    new HTMLTag('input').addAttr('id',formID+'_hash').addAttr('name',formID+'_hash').addAttr('placeholder','Cég azonosító kód').addAttr('type','text').append(hashForm);
    new HTMLTag('button').setText('Beállítás').append(hashForm).onclick(()=>{
        setSessionHash();
    }).preventDefaultEvent('click');
}

