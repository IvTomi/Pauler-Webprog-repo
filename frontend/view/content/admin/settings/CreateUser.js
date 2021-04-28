import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent} from './mainSettings.js';
import {CreateUser} from '../../../../controllers/settingsController.js';


function createNewUserView(){
    const content = refreshContent(0);
    
    const valami = new HTMLTag('div').append(content);
    //if(van rá jogosultsága){}
    CreateUser(valami);
    
    //jogosultságok felsorolása
}

export default createNewUserView;

