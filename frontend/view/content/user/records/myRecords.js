import { createMyRecordList } from '../../../listBuilders/recordListBuilder.js';
import {refreshContent,setUpListField} from './mainRecord.js';
import HTMLTag from '../../../../utilities/HTMLTag.js';
import RecordData from '../../../../datasets/recordData.js';
import makeTimeframeSelect from '../../../../utilities/dateHandling.js';

function createMyRecordsView(){
    const content = refreshContent(1);
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/recordlist.css').append(document.body);
    const timeframe = makeTimeframeSelect('timeFrame',content,{});
    new HTMLTag('input').addAttr('id','search').addAttr('name','search').addAttr('placeholder','Keresés projektnév alapján').addAttr('type','text').append(content).addEventListener('input',(event)=>{
        console.log('YO')
        updateList()
    });
    timeframe.addEventListener('change',updateList);
    
    updateList();
    
}

function updateList(){
    const timeframe = document.getElementById('timeFrame');
    const content = document.getElementById('content');
    let filter = document.getElementById('search').value;
    const options = {};
    if(timeframe.value !== '0'){
        options['timeframe'] = timeframe.value;

    }
    if(filter)
    options['filter'] = filter
    const listDiv = setUpListField(content);

    createMyRecordList(new RecordData().recordTestData,listDiv,options);
}

export default createMyRecordsView;