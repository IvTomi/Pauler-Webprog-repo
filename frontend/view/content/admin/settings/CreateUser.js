import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent} from './mainSettings.js';
import {CreateUser} from '../../../listBuilders/adminNewSettingsListBuilder.js';


function createNewUserView(){
    const content = refreshContent(0);

    //if(van rá jogosultsága){}
    CreateUser(content);
    
}

export default createNewUserView;

