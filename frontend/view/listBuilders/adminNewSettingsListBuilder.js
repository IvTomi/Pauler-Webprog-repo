import HTMLTag from '../../utilities/HTMLTag.js';
import {addUserToDb} from "../../controllers/settingsNewController.js"

export function CreateUser(appendPoint){

    new HTMLTag('h1').setText('Fiók létrehozása').append(appendPoint);
    
    const createID = 'createForm';
    const createForm = new HTMLTag('form').addAttr('class','createForm').addAttr('id',createID);
    new HTMLTag('h2').setText('Felhasználói adatok').append(createForm);

    new HTMLTag('p').setText('Felhasználónév').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_username').addAttr('name',createID+'_username').addAttr('type','text').append(createForm);
    new HTMLTag('p').setText('Vezetéknév').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_lastname').addAttr('name',createID+'_lastname').addAttr('type','text').append(createForm);
    new HTMLTag('p').setText('Keresztnév').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_firstname').addAttr('name',createID+'_firstname').addAttr('type','text').append(createForm);
    new HTMLTag('p').setText('Jelszó').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_pass').addAttr('name',createID+'_pass').addAttr('type','password').append(createForm);
    new HTMLTag('p').setText('Jelszó újra').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_passAgain').addAttr('name',createID+'_passAgain').addAttr('type','password').append(createForm);
    


    createForm.append(appendPoint);
    new HTMLTag('button').setText('Létrehozás').addAttr('class','modifyButton').append(appendPoint).onclick(()=>{addUserToDb()}).preventDefaultEvent('click');
   
   
}