import viewController from '../../../../controllers/viewController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProfileDataList} from '../../../listBuilders/profileListBuilder.js';
import adminProfileData from '../../../../datasets/adminProfileData.js';


function setUpAdminProfile(appendPoint){
    const img = new HTMLTag('img').addAttr('src','./res/defaultUser.png').addAttr('alt','user képe').append(appendPoint);
    const name = new HTMLTag('h1').setText('Cég neve').append(appendPoint);
    
    const listDiv = setUpListField(appendPoint);
    createProfileDataList(new adminProfileData().testAdminProfileData,listDiv);

    //if this.admin views the profile 
    const add = new HTMLTag('div').addAttr('id','add').append(appendPoint);
    let type = new HTMLTag('input').addAttr('placeholder','Tipus').append(add);
    let value = new HTMLTag('input').addAttr('placeholder','Érték').append(add);
    const button = new HTMLTag('button').setText('Hozzáadás').append(add);
}

function setUpListField(appendPoint){
    let list = document.getElementById('list');
        if(list){
            new viewController().clearTag(list);
            return list;
        }
        else{
            list = document.createElement('ul');
            list.setAttribute('id','list');
            appendPoint.appendChild(list);
            return list;
        }
}


export default setUpAdminProfile;