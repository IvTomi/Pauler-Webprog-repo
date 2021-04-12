import viewController from '../../../../controllers/viewController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProfileDataList} from '../../../listBuilders/profileListBuilder.js';
import userProfileData from '../../../../datasets/userProfileData.js';

function setUpUserProfile(){
    let prof = document.getElementById('prof');
    if(prof){
        new viewController().clearTag(prof);
        return setUpProfile(document.body);
    }else {
        return setUpProfile(document.body);
    }
}

function setUpProfile(appendPoint){
    const profile = new HTMLTag('div').addAttr('id','prof').append(appendPoint);
    const img = new HTMLTag('img').addAttr('src','./res/defaultUser.png').addAttr('alt','user képe').append(profile);
    const name = new HTMLTag('h1').setText('Példa Mónika').append(profile);
    
    const listDiv = setUpListField(profile);
    createProfileDataList(new userProfileData().testProfileData,listDiv);

    const add = new HTMLTag('div').addAttr('id','add').append(profile);
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
            list = new HTMLTag('ul').addAttr('id','list').append(appendPoint);
            return list;
        }
}

export default setUpUserProfile;