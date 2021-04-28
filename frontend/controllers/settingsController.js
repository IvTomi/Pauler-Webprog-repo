import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';



export function CreateUser(appendPoint){
    new HTMLTag('h1').setText('Fiók létrehozása').append(appendPoint);
    
    const createID = 'createForm';
    const createForm = new HTMLTag('form').addAttr('class','createForm').addAttr('id',createID);
    new HTMLTag('h2').setText('Felhasználói adatok').append(createForm);

    new HTMLTag('p').setText('Felhasználónév').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_username').addAttr('name',createID+'_username').addAttr('type','text').append(createForm);
    new HTMLTag('p').setText('E-mail cím').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_mail').addAttr('name',createID+'_mail').addAttr('type','text').append(createForm);
    new HTMLTag('p').setText('Jelszó').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_pass').addAttr('name',createID+'_pass').addAttr('type','password').append(createForm);
    new HTMLTag('p').setText('Jelszó újra').append(createForm);
    new HTMLTag('input').addAttr('id',createID+'_passAgain').addAttr('name',createID+'_passAgain').addAttr('type','password').append(createForm);
    
    new HTMLTag('h2').setText('Jogosultságok').append(createForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(createID + '_chb').addAttr('name',createID + '_chb0').addAttr('value','DeleleteOwnRecords').append(createForm);
    new HTMLTag('p').setText('Saját rekordok törlése').addClass(createID + '_permName').addAttr('name',createID + '_name0').append(createForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(createID + '_chb').addAttr('name',createID + '_chb1').addAttr('value','ModifyOwnRecords').append(createForm);
    new HTMLTag('p').setText('Saját rekordok módosítása').addClass(createID + '_permName').addAttr('name',createID + '_name1').append(createForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(createID + '_chb').addAttr('name',createID + '_chb2').addAttr('value','isAdmin').append(createForm);
    new HTMLTag('p').setText('Adminként való bejelentkezés').addClass(createID + '_permName').addAttr('name',createID + '_name2').append(createForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(createID + '_chb').addAttr('name',createID + '_chb3').addAttr('value','ModifyUserData').append(createForm);
    new HTMLTag('p').setText('Felhasználók kezelése').addClass(createID + '_permName').addAttr('name',createID + '_name3').append(createForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(createID + '_chb').addAttr('name',createID + '_chb4').addAttr('value','ModifyUserContact').append(createForm);
    new HTMLTag('p').setText('Felhasználói profilok módosítása').addClass(createID + '_permName').addAttr('name',createID + '_name4').append(createForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(createID + '_chb').addAttr('name',createID + '_chb5').addAttr('value','ModifyProjects').append(createForm);
    new HTMLTag('p').setText('Projektek kezelése').addClass(createID + '_permName').addAttr('name',createID + '_name5').append(createForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(createID + '_chb').addAttr('name',createID + '_chb6').addAttr('value','ModifyTeams').append(createForm);
    new HTMLTag('p').setText('Csapatok kezelése').addClass(createID + '_permName').addAttr('name',createID + '_name6').append(createForm);

    new HTMLTag('button').setText('Létrehozás').append(createForm).onclick(()=>{addUserToDb()}).preventDefaultEvent('click');
   
    createForm.append(appendPoint);
}

function addUserToDb(){
    const permissions = document.getElementsByClassName('Createform_chb');
    const userData = [
        document.getElementById('createForm_username').value,
        document.getElementById('createForm_mail').value,
        document.getElementById('createForm_pass').value,
        document.getElementById('createForm_passAgain').value
    ];
    if(userData[0] && userData[1] && userData[2] && userData[2] === userData [3]){
        alert(userData);

        //itt még feltételek és felh létrehozása
    }
    for(let i = 0; i < 7; i++){
        if(permissions[i].checked){
            alert(permissions[i].value);
            //itt írja be az adatbázisba a value értékét
        }
        
    }
    
}