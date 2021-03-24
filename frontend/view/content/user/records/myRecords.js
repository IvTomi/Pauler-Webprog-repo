import { createMyRecordList } from '../../../listBuilders/recordListBuilder.js';
import {refreshContent,setUpListField} from './mainRecord.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import RecordData from '../../../../datasets/recordData.js';

function createMyRecordsView(){
    const content = refreshContent(1);

    const timeFrame = new HTMLTag('select').addAttr('id','timeFrame').addAttr('name','timeFrame').addAttr('value',0).append(content);
    new HTMLTag('option').addAttr('value',0).setText('Elmúlt nap').append(timeFrame);
    new HTMLTag('option').addAttr('value',1).setText('Elmúlt hét').append(timeFrame);
    new HTMLTag('option').addAttr('value',2).setText('Elmúlt hónap').append(timeFrame);
    new HTMLTag('option').addAttr('value',3).setText('Elmúlt év').append(timeFrame);
    new HTMLTag('input').addAttr('id','search').addAttr('name','search').addAttr('placeholder','keresés projektnév alapján').addAttr('type','text').append(content);
    const listDiv = setUpListField(content);

    createMyRecordList(new RecordData().recordTestData,listDiv,null);
    
}

export default createMyRecordsView;