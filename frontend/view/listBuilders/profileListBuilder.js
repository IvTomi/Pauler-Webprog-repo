import HTMLTag from "../../utilities/HTMLTag.js";
import RecordData from "../../datasets/userProfileData.js";

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