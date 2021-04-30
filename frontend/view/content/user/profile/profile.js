import viewController from '../../../../controllers/viewController.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProfileDataList} from '../../../listBuilders/userProfileListBuilder.js';
import userProfileData from '../../../../datasets/userProfileData.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';

function setUpUserProfile(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(-1,navList);

    
    const listDiv = createProfileDataList(0,appendPoint);
    //= setUpListField(content.node);
    //createProfileDataList(new userProfileData().testProfileData,listDiv);
 
}


export default setUpUserProfile;