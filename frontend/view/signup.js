
import HTMLTag from '../utilities/HTMLTag.js';
import {router} from '../index.js';
import {sendRegister} from '../controllers/registrationController.js'

function createSignup(){
    const formID= 'signupForm';
    const signupForm = new HTMLTag('form').addAttr('class','loginForm').addAttr('id',formID).append(document.body);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/loginpanel.css').append(document.body);
    new HTMLTag('h2').setText('Regisztráció').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_company').addAttr('name',formID+'_company').addAttr('placeholder','Cég neve').addAttr('type','text').append(signupForm);
    
    new HTMLTag('input').addAttr('id',formID+'_username').addAttr('name',formID+'_username').addAttr('placeholder','Felhasználónév').addAttr('type','text').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_mail').addAttr('name',formID+'_mail').addAttr('placeholder','Email cím').addAttr('type','text').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_pass').addAttr('name',formID+'_pass').addAttr('placeholder','Jelszó').addAttr('type','password').append(signupForm);
    new HTMLTag('input').addAttr('id',formID+'_passAgain').addAttr('name',formID+'_passAgain').addAttr('placeholder','Jelszó megerősítés').addAttr('type','password').append(signupForm);
    new HTMLTag('a').setText('Vissza a bejelentkezéshez').addAttr('href','').append(signupForm).onclick(()=>{router.navigate('login')}).preventDefaultEvent('click');
    
    new HTMLTag('button').setText('Regisztráció').append(signupForm).onclick(()=>{sendRegister()}).preventDefaultEvent('click');
   
}

export default createSignup;