import {refreshContent} from './mainRecord.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { getProjects } from '../../../listBuilders/recordListBuilder.js';

function createNewRecordView(){
    const content = refreshContent(0);

    new HTMLTag('h2').setText('Rekord hozzáadása').append(content);
    const formID = 'newRecordForm';
    const form = new HTMLTag('form').addAttr('id',formID).append(content);
    const taskSelect = new HTMLTag('select').addAttr('id',formID+'_taskSelect').addAttr('name',formID+'_taskSelect').addAttr('value',-1).append(form);
    new HTMLTag('option').addAttr('value',-1).setText('Feladat kiválasztása').append(taskSelect);
    let i=0;
    for(let task of getProjects()){
        new HTMLTag('option').addAttr('value',i).setText(task).append(taskSelect);
        i++;
    }
    new HTMLTag('textarea').addAttr('id',formID+'_desc').addAttr('name',formID+'_desc').addAttr('placeholder','Megjegyzés').append(form);
    new HTMLTag('label').addAttr('for',formID+'_length').append(form);
    new HTMLTag('input').addAttr('id',formID+'_length').addAttr('name',formID+'_length').addAttr('placeholder','óó:pp').addAttr('type','text').append(form);
    new HTMLTag('label').addAttr('for',formID+'_date').append(form);
    new HTMLTag('input').addAttr('id',formID+'_date').addAttr('name',formID+'_date').addAttr('type','date').append(form);
    const status = new HTMLTag('select').addAttr('id',formID+'_status').addAttr('name',formID+'_status').addAttr('value',-1).append(form);
    new HTMLTag('option').addAttr('value',-1).setText('Státusz').append(status);
    new HTMLTag('button').setText('Létrehozás').append(form);
    
}

export default createNewRecordView;