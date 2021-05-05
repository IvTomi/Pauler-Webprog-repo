import HTMLTag from '../../utilities/HTMLTag.js';
import {modifyUser} from "../../controllers/settingsManageController.js";
import {allUsers} from "../../controllers/userProfileController.js";
import {deleteUser} from "../../controllers/settingsManageController.js";

export function ManageUser(appendPoint){

    allUsers();

    //while van alkalmazott
    new HTMLTag('h1').setText('Felhasználók kezelése').append(appendPoint);
    const frame = new HTMLTag('div').append(appendPoint);
    new HTMLTag('h3').setText('Alkalmazott neve').append(frame);
    new HTMLTag('button').setText('X').append(frame).onclick(()=>{deleteUser()}).preventDefaultEvent('click');;
    
    const modifyID = 'modifyForm';
    const modifyForm = new HTMLTag('form').addAttr('class','modifyForm').addAttr('id',modifyID).append(frame);
    new HTMLTag('h2').setText('Jelszó megváltoztatása').append(modifyForm);

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


export function modifyButtons(data){
    const permissions = document.getElementsByClassName('modifyForm_chb');

    //gombok pepipálása majd a megadott értékek alapján
}