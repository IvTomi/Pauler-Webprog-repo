import { createMyRecordList } from '../../../listBuilders/recordListBuilder.js';
import {refreshContent,setUpListField} from './mainRecord.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import RecordData from '../../../../datasets/recordData.js';
import makeTimeframeSelect from '../../../../utilities/dateHandling.js';

function createMyRecordsView(){
    const content = refreshContent(1);

    const timeframe = makeTimeframeSelect('timeFrame',content);
    new HTMLTag('input').addAttr('id','search').addAttr('name','search').addAttr('placeholder','keresés projektnév alapján').addAttr('type','text').append(content);
    const listDiv = setUpListField(content);

    createMyRecordList(new RecordData().recordTestData,listDiv,null);
    
}

export default createMyRecordsView;