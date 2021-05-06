import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';
import { listAllTasks } from '../../../listBuilders/adminTaskListBuilder.js';
import { SessionJanitor } from '../../../../utilities/sessionJanitor.js';

function createAllProjectsView(){
    const content = refreshContent(0);
    
    const listDiv = setUpListField(content);
   SessionJanitor.getAllTasks(()=>{listAllTasks(SessionJanitor.getAllTasks(null))});
}

export default createAllProjectsView;