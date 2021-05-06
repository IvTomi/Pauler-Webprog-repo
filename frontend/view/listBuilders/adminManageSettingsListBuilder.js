import HTMLTag from '../../utilities/HTMLTag.js';
import {modifyUser} from "../../controllers/settingsManageController.js";
import {allUsers} from "../../controllers/userProfileController.js";
import {deleteUser} from "../../controllers/settingsManageController.js";
import {initProfiles} from "../../controllers/settingsManageController.js";

export function ManageUser(appendPoint){   

    
    
    //while van alkalmazott
    new HTMLTag('h1').setText('Felhasználók kezelése').append(appendPoint);
    const frame = new HTMLTag('div').append(appendPoint);
    new HTMLTag('h3').setText('Alkalmazott neve').append(frame);
    initProfiles(frame);
    const modifyID = 'modifyForm';
    const modifyForm = new HTMLTag('form').addAttr('class','modifyForm').addAttr('id',modifyID).append(frame);
    new HTMLTag('h2').setText('Jelszó megváltoztatása').append(modifyForm);

    new HTMLTag('p').setText('Keresztnév').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_firstname').addAttr('name',modifyID+'_firstname').append(modifyForm);

    new HTMLTag('p').setText('Vezetéknév').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_lastname').addAttr('name',modifyID+'_lastname').append(modifyForm);


    new HTMLTag('p').setText('Új jelszó').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_pass').addAttr('name',modifyID+'_pass').addAttr('type','password').append(modifyForm);
    new HTMLTag('p').setText('Jelszó újra').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_passAgain').addAttr('name',modifyID+'_passAgain').addAttr('type','password').append(modifyForm);
    
    new HTMLTag('h2').setText('Jogosultságok').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb1').addAttr('value','CanEditUser').append(modifyForm);
    new HTMLTag('p').setText('Felhasználók szerkesztése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name1').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb2').addAttr('value','IsAdmin').append(modifyForm);
    new HTMLTag('p').setText('Adminként való bejelentkezés').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name2').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb3').addAttr('value','CanEditTeam').append(modifyForm);
    new HTMLTag('p').setText('Csapatok kezelése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name3').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb4').addAttr('value','CanEditTask').append(modifyForm);
    new HTMLTag('p').setText('Feladatok kezelése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name4').append(modifyForm);
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb5').addAttr('value','CanEditRecord').append(modifyForm);
    new HTMLTag('p').setText('Saját rekordok kezelése').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name5').append(modifyForm);

    new HTMLTag('button').setText('Módosítás').append(modifyForm).onclick(()=>{modifyUser()}).preventDefaultEvent('click');
   
}
