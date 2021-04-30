import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent} from './mainSettings.js';
import {ManageUser} from '../../../listBuilders/adminManageSettingsListBuilder.js';

function createUserManagerView(){
    const content = refreshContent(1);

    //if(van rá jogosultsága)
    ManageUser(content);
    
}

export default createUserManagerView;

