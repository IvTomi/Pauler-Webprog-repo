import viewController from '../../../../controllers/viewController.js';
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import createMyRecordsView from './myRecords.js';
import createNewRecordView from './newRecord.js';
import createTeamRecordsView from './teamRecords.js';

function setUpUserRecordViews(appendPoint){
    const navList = document.querySelector('nav ul');
    changeHighlithed(0,navList);//Selects the first element [which is the records] on user nav bar

    const selecter=new HTMLTag('ul').addAttr('id','selecter').append(appendPoint);
    new HTMLTag('div').addAttr('id','content').append(appendPoint);
    
    new HTMLTag('li').setText('Rekord hozzáadása').append(selecter).onclick(createNewRecordView);
    new HTMLTag('li').setText('Rekordjaim').append(selecter).onclick(createMyRecordsView);
    new HTMLTag('li').setText('Csapattagok rekordjai').append(selecter).onclick(createTeamRecordsView);
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