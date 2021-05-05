import HTMLTag from "../../utilities/HTMLTag.js";
import RecordData from "../../datasets/userProfileData.js";
import {SessionJanitor} from "../../utilities/sessionJanitor.js"
import {resetInputData} from '../../controllers/settingsManageController.js'

export function createProfileDataList(data,appendPoint){
    
    for(let contact of data){
        if(contact.visible){
            //if admin, or this.user views the profile 
            new HTMLTag('button').setText('X').append(appendPoint);
            
            new HTMLTag('li').setText(contact.name).append(appendPoint);
            new HTMLTag('li').setText(contact.value).append(appendPoint);
        }
        
    }
    
}

export function createProfile(user,appendPoint){
    SessionJanitor.setActiveProfile(null); 
    if(user.img){
        new HTMLTag('img').addAttr('src',user.img).addAttr('alt','user képe').append(appendPoint).onclick(()=>{
            //viewController.loadUserProfile(0,user.id);
            SessionJanitor.setActiveProfile(user);     
            resetInputData();     
        });
    }
    new HTMLTag('li').setText(user.username).append(appendPoint);   
    
}