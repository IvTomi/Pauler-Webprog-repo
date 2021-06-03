import HTMLTag from '../../../../utilities/HTMLTag.js';
import {createProfileDataList} from '../../../listBuilders/userProfileListBuilder.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import {SessionJanitor} from '../../../../utilities/sessionJanitor.js'


function setUpUserProfile(appendPoint,id){
    const navList = document.querySelector('nav ul');
    changeHighlithed(-1,navList);
    let mainContent = document.getElementById("MainContent");
    const content = new HTMLTag('div').addAttr('id','content').append(mainContent);
    const thisUserId = id?id:SessionJanitor.getSessionUser().id;

    createProfileDataList(thisUserId);
    ;
    //= setUpListField(content.node);
    //createProfileDataList(new userProfileData().testProfileData,listDiv);
 
}


export default setUpUserProfile;