import viewController from '../../../../controllers/viewController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProfileDataList} from '../../../listBuilders/profileListBuilder.js';
import adminProfileData from '../../../../datasets/adminProfileData.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import {getCompanyName,addNewContact} from '../../../listBuilders/adminProfileListBuilder.js';


function setUpAdminProfile(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(-1,navList);

    
    //ha van joga megnézni a profilt

    const content = new HTMLTag('div').addAttr('id','content').append(appendPoint);
    const name = new HTMLTag('h1').setText('Cég neve').append(content);
    //getCompanyName();
    
    const listDiv = setUpListField(content.node);
    createProfileDataList(new adminProfileData().testAdminProfileData,listDiv);


    //ha van joga hozzáadni
    const add = new HTMLTag('div').addAttr('id','add').append(content);
    let contactType = new HTMLTag('input').addAttr('id','contactType').addAttr('name','contactType').addAttr('placeholder','Tipus').append(add);
    let contactValue = new HTMLTag('input').addAttr('id','contactValue').addAttr('name','contactValue').addAttr('placeholder','Érték').append(add);
    const button = new HTMLTag('button').setText('Hozzáadás').append(add).onclick(()=>addNewContact(contactType.value,contactValue.value));
}
/*
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
*/

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