import HTMLTag from '../../utilities/HTMLTag.js';
import {modifyUser} from "../../controllers/settingsManageController.js";
import {allUsers} from "../../controllers/userProfileController.js";
import {deleteUser} from "../../controllers/settingsManageController.js";
import {initProfiles} from "../../controllers/settingsManageController.js";

export function ManageUser(appendPoint){   

    
    
    //while van alkalmazott
    new HTMLTag('h1').setText('Felhasználók kezelése').append(appendPoint);
    const frame = new HTMLTag('div').addAttr('class','usersFrame').append(appendPoint);
    new HTMLTag('h3').setText('Felhasználói fiókok').append(frame);
    let userSelectList = new HTMLTag('div').addAttr('class','usersList').append(frame)
    initProfiles(userSelectList);
    const modifyID = 'modifyForm';
    const modifyForm = new HTMLTag('form').addAttr('class','modifyForm').addAttr('id',modifyID).append(frame);
    new HTMLTag('h2').setText('Nincs felhasználó kiválasztva').addAttr('id','modifyTitle').append(modifyForm);

    new HTMLTag('p').setText('Keresztnév').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_firstname').addAttr('name',modifyID+'_firstname').append(modifyForm);

    new HTMLTag('p').setText('Vezetéknév').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_lastname').addAttr('name',modifyID+'_lastname').append(modifyForm);


    new HTMLTag('p').setText('Új jelszó').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_pass').addAttr('name',modifyID+'_pass').addAttr('type','password').append(modifyForm);
    new HTMLTag('p').setText('Jelszó újra').append(modifyForm);
    new HTMLTag('input').addAttr('id',modifyID+'_passAgain').addAttr('name',modifyID+'_passAgain').addAttr('type','password').append(modifyForm);
    

    new HTMLTag('h2').setText('Jogosultságok').append(modifyForm);
    let perm = new HTMLTag('div').addAttr('class','permissionField').append(modifyForm)
    new HTMLTag('input').addAttr('type','checkbox').addClass(modifyID + '_chb').addAttr('name',modifyID + '_chb2').addAttr('value','IsAdmin').append(perm);
    new HTMLTag('p').setText('Admin').addClass(modifyID + '_permName').addAttr('name',modifyID + '_name2').append(perm);

    new HTMLTag('button').setText('Módosítás').addAttr('class','modifyButton').append(appendPoint).onclick(()=>{modifyUser()}).preventDefaultEvent('click');
   
}
