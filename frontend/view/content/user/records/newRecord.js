import {refreshContent} from './mainRecord.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import { getProjects } from '../../../listBuilders/recordListBuilder.js';
import {mapTask} from '../../../../factory/taskfactory.js'
import {createRecord} from '../../../../controllers/createRecordController.js'

function createNewRecordView(){
    const content = refreshContent(0);

    new HTMLTag('h2').setText('Rekord hozzáadása').append(content);
    const formID = 'newRecordForm';
    const form = new HTMLTag('form').addAttr('id',formID).append(content);
    const taskSelect = new HTMLTag('select').addAttr('id',formID+'_taskSelect').addAttr('name',formID+'_taskSelect').addAttr('value',-1).append(form);
    new HTMLTag('option').addAttr('value',-1).setText('Feladat kiválasztása').append(taskSelect);
    let i=0;
    getProjects(fillTasks,taskSelect)
    new HTMLTag('textarea').addAttr('id',formID+'_desc').addAttr('name',formID+'_desc').addAttr('placeholder','Megjegyzés').append(form);
    new HTMLTag('label').addAttr('for',formID+'_hour').append(form);
    new HTMLTag('input').addAttr('id',formID+'_hour').addAttr('name',formID+'_hour').addAttr('placeholder','óra').addAttr('type','text').append(form);
    new HTMLTag('label').addAttr('for',formID+'_min').append(form);
    new HTMLTag('input').addAttr('id',formID+'_min').addAttr('name',formID+'_min').addAttr('placeholder','perc').addAttr('type','text').append(form);
    new HTMLTag('label').addAttr('for',formID+'_date').append(form);
    new HTMLTag('input').addAttr('id',formID+'_date').addAttr('name',formID+'_date').addAttr('type','date').append(form);
    new HTMLTag('button').setText('Létrehozás').append(form).onclick(()=>{createRecord()});
    
}

function fillTasks(tasks,root){
    console.log(root)
    for(let task of tasks){
        let t = mapTask(task['Task'])
        new HTMLTag('option').addAttr('value',t.id).setText(t.taskname).append(root);
    }
}

export default createNewRecordView;