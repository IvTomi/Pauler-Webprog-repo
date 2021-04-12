import HTMLTag from "../../utilities/HTMLTag.js";
import RecordData from "../../datasets/userProfileData.js";

export function createProfileDataList(data,appendPoint){
    const one = new HTMLTag('ul')
    for(let contact of data){
        if(contact.visible){
            new HTMLTag('li').setText(contact.name).append(one);
            new HTMLTag('li').setText(contact.value).append(one);
        }
        
    }
    one.append(appendPoint);
}