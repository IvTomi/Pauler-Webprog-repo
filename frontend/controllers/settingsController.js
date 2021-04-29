import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from './logincontroller.js';

export function ManageUser(appendPoint){

    makeRequest('/user/list','POST',getHeader(),'{}',(data)=>{OnListSuccess(data)},()=>{OnListFail()});

    //while van alkalmazott
    new HTMLTag('h1').setText('Felhasználók kezelése').append(appendPoint);
    const frame = new HTMLTag('div').append(appendPoint);
    new HTMLTag('h3').setText('Alkalmazott neve').append(frame);
    new HTMLTag('button').setText('X').append(frame).onclick(()=>{deleteUser()}).preventDefaultEvent('click');;
    
    const modifyID = 'modifyForm';
    const modifyForm = new HTMLTag('form').addAttr('class','modifyForm').addAttr('id',modifyID).append(frame);
    new HTMLTag('h2').setText('Jelszó megváltoztatása').append(modifyForm);

    new HTMLTag('p').setText('Régi jelszó').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_oldpass').addAttr('name',modifyID+'_oldpass').addAttr('type','password').append(modifyForm);
    new HTMLTag('p').setText('Új jelszó').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_pass').addAttr('name',modifyID+'_pass').addAttr('type','password').append(modifyForm);
    new HTMLTag('p').setText('Jelszó újra').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_passAgain').addAttr('name',modifyID+'_passAgain').addAttr('type','password').append(modifyForm);
    
    new HTMLTag('h2').setText('Jogosultságok').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb0').addAttr('value','DeleleteOwnRecords').append(modifyForm);
    new HTMLTag('p').setText('Saját rekordok törlése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name0').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb1').addAttr('value','ModifyOwnRecords').append(modifyForm);
    new HTMLTag('p').setText('Saját rekordok módosítása').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name1').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb2').addAttr('value','isAdmin').append(modifyForm);
    new HTMLTag('p').setText('Adminként való bejelentkezés').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name2').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb3').addAttr('value','ModifyUserData').append(modifyForm);
    new HTMLTag('p').setText('Felhasználók kezelése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name3').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb4').addAttr('value','ModifyUserContact').append(modifyForm);
    new HTMLTag('p').setText('Felhasználói profilok módosítása').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name4').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb5').addAttr('value','ModifyProjects').append(modifyForm);
    new HTMLTag('p').setText('Projektek kezelése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name5').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb6').addAttr('value','ModifyTeams').append(modifyForm);
    new HTMLTag('p').setText('Csapatok kezelése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name6').append(modifyForm);

    new HTMLTag('button').setText('Módosítás').append(modifyForm).onclick(()=>{modifyUser()}).preventDefaultEvent('click');
   
}

function deleteUser(){
    makeRequest('/user/remove','POST',getHeader(),'{}',(data)=>{OnDeleteSuccess(data)},()=>{OnDeleteFail()});

}
function OnDeleteSuccess(data){
    console.log(data);
}

function OnDeleteFail(){
    console.log('hibbaaaa');
}


function OnListSuccess(data){
    console.log(data);
}

function OnListFail(){
    console.log('hibbaaaa');
}




//---------------------------------------------------------------------------------//

function modifyUser(){
    const permissions = document.getElementsByClassName('modifyForm_chb');
    const userData = [
        document.getElementById('modifyForm_oldpass').value,
        document.getElementById('modifyForm_pass').value,
        document.getElementById('modifyForm_passAgain').value
    ];
    if(userData[0] && userData[1] && userData[2] === userData [1]){
        alert(userData);

        //itt még feltételek és felh módosítása
    }
    for(let i = 0; i < 7; i++){
        if(permissions[i].checked){
            alert(permissions[i].value);
            //itt írja be az adatbázisba a value értékét
        }
        
    }
}

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
    const permissions = document.getElementsByClassName('createForm_chb');
    const userData = [
        //ide email helyett vezeték és keresztnév?
        document.getElementById('createForm_username').value,
        document.getElementById('createForm_mail').value,
        document.getElementById('createForm_pass').value,
        document.getElementById('createForm_passAgain').value
    ];
    if(userData[0] && userData[1] && userData[2] && userData[2] === userData [3]){

        makeRequest('/user/create','POST',getHeader(),JSON.stringify({"username":userData[0],"password":userData[2]}),(data)=>{OutputOnSuccess(data)},(data)=>{OutputOnFail(data)});
    }
    for(let i = 0; i < 7; i++){
        if(permissions[i].checked){
            alert(permissions[i].value);
            //itt írja be az adatbázisba a value értékét
        }
        
    }
    
}

function OutputOnSuccess(data){
    alert('ok');
}

function OutputOnFail(data){
    alert('hiba');
}