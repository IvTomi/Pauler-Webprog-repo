import viewController from '../../../../controllers/viewController.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createMyRecordsView from './myRecords.js';
import createNewRecordView from './newRecord.js';
import createTeamRecordsView from './teamRecords.js';
import {router} from '../../../../index.js'

function setUpUserRecordViews(appendPoint,state){
    const navList = document.querySelector('nav ul');
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/contentbox.css').append(document.body);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/navigationbox.css').append(document.body);
    let mainContent = document.getElementById("MainContent");
    changeHighlithed(0,navList);//Selects the first element [which is the records] on user nav bar

    new HTMLTag('div').addAttr('id','content').append(mainContent);
    const selecter=new HTMLTag('ul').addAttr('id','selecter').append(mainContent);

    new HTMLTag('li').setText('Rekord hozzáadása').append(selecter).onclick(()=>{router.navigate('createRecordUser')});
    new HTMLTag('li').setText('Rekordjaim').append(selecter).onclick(()=>{router.navigate('myRecordsUser')});

    if(state === 0){
        createMyRecordsView()
    }else if(state === 2){
        createNewRecordView();
    }else{
        
    }
}


export function refreshContent(n){
    const selecters = document.getElementById('selecter');
    changeHighlithed(n,selecters);
    const content = document.getElementById('content');
    new viewController().clearTag(content);
    return content;
}

export function setUpListField(appendPoint){
    let list = document.getElementById('list');
        if(list){
            new viewController().clearTag(list);
            return list;
        }
        else{
            list = document.createElement('ul');
            list.setAttribute('id','list');
            appendPoint.appendChild(list);
            return list;
        }
}

export default setUpUserRecordViews;