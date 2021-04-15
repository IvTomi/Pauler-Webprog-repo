import viewController from '../../../../controllers/viewController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProfileDataList} from '../../../listBuilders/profileListBuilder.js';
import adminProfileData from '../../../../datasets/adminProfileData.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';


function setUpAdminProfile(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(-1,navList);
    const content = new HTMLTag('div').addAttr('id','content').append(appendPoint);
    const img = new HTMLTag('img').addAttr('src','./res/defaultUser.png').addAttr('alt','user képe').append(content);
    const name = new HTMLTag('h1').setText('Cég neve').append(content);
    
    const listDiv = setUpListField(content);
    createProfileDataList(new adminProfileData().testAdminProfileData,listDiv);

    //if this.admin views the profile 
    const add = new HTMLTag('div').addAttr('id','add').append(content);
    let type = new HTMLTag('input').addAttr('id','type').addAttr('name','type').addAttr('placeholder','Tipus').append(add);
    let value = new HTMLTag('input').addAttr('id','value').addAttr('name','value').addAttr('placeholder','Érték').append(add);
    const button = new HTMLTag('button').setText('Hozzáadás').append(add).onclick(addNewContact);
}

function addNewContact(){
    let typeRead = document.getElementById('type').value;
    let valueRead = document.getElementById('value').value;

    if(typeRead && valueRead){
        const list = document.getElementById('list');
        new HTMLTag('button').setText('X').append(list);
        new HTMLTag('li').setText(typeRead).append(list);
        new HTMLTag('li').setText(valueRead).append(list);
    }
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