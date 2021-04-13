import viewController from '../../../../controllers/viewController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProfileDataList} from '../../../listBuilders/profileListBuilder.js';
import userProfileData from '../../../../datasets/userProfileData.js';

function setUpUserProfile(appendPoint){
    const img = new HTMLTag('img').addAttr('src','./res/defaultUser.png').addAttr('alt','user képe').append(appendPoint);
    const name = new HTMLTag('h1').setText('Példa Mónika').append(appendPoint);
    
    const listDiv = setUpListField(appendPoint);
    createProfileDataList(new userProfileData().testProfileData,listDiv);

    const add = new HTMLTag('div').addAttr('id','add').append(appendPoint);
    let type = new HTMLTag('input').addAttr('placeholder','Tipus').append(add);
    let value = new HTMLTag('input').addAttr('placeholder','Érték').append(add);
    const button = new HTMLTag('button').setText('Hozzáadás').append(add);
}







export default setUpUserProfile;