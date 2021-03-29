import { createTeamRecordList,getProjects,getTeams } from "../../../listBuilders/recordListBuilder.js";
import { refreshContent,setUpListField } from "./mainRecord.js";
import HTMLTag from '../../../../utilities/HTMLTag.js';
import RecordData from '../../../../datasets/recordData.js';
import makeTimeframeSelect from '../../../../utilities/dateHandling.js';

function createTeamRecordsView(){
    const content = refreshContent(2);

    const timeframe = makeTimeframeSelect('timeFrame',content,{});
    timeframe.addEventListener('change',updateList);

    const teamSelect = new HTMLTag('select').addAttr('id','teamSelect').addAttr('name','teamSelect').addAttr('value',0).append(content);
    new HTMLTag('option').addAttr('value',0).setText('Minden csapat').append(teamSelect);
    let i = 0;
    for(let team of getTeams()){
        new HTMLTag('option').addAttr('value',team).setText(team).append(teamSelect);
        i++;
    }
    teamSelect.addEventListener('change',updateFromTeamSelect);

    const taskSelect = new HTMLTag('select').addAttr('id','taskSelect').addAttr('name','taskSelect').addAttr('value',0).append(content);
    new HTMLTag('option').addAttr('value',0).setText('Minden feladat').append(taskSelect);
    i=0;
    for(let task of getProjects()){
        new HTMLTag('option').addAttr('value',task).setText(task).append(taskSelect);
        i++;
    }
    taskSelect.addEventListener('change',updateList);
    updateList();
}

function updateList(){
    const timeframe = document.getElementById('timeFrame');
    const teamSelect = document.getElementById('teamSelect');
    const taskSelect = document.getElementById('taskSelect');
    const options = {};

    if(timeframe.value !== '0'){
        options['timeframe'] = timeframe.value;
    }
    if(teamSelect.value !== '0'){
        options['team'] = teamSelect.value;
    }
    if(taskSelect.value !== '0'){
        options['task'] = taskSelect.value;
    }
    console.log(options);
    let listDiv = setUpListField(content);
    createTeamRecordList(new RecordData().recordTestData,listDiv,options);
}

function updateFromTeamSelect(){
    const teamSelect = document.getElementById('teamSelect');
    const taskSelect = document.getElementById('taskSelect');
    let i;
    taskSelect.innerHTML = '';
    if(teamSelect.value === '0'){
        taskSelect.setAttribute('value',0);
        new HTMLTag('option').addAttr('value',0).setText('Minden feladat').append(taskSelect);
        i=0;
        for(let task of getProjects()){
            new HTMLTag('option').addAttr('value',task).setText(task).append(taskSelect);
            i++;
        }
    }
    else{
        taskSelect.setAttribute('value',0);
        new HTMLTag('option').addAttr('value',0).setText('Minden feladat').append(taskSelect);
        i=0;
        for(let task of getProjects(teamSelect.value)){
            new HTMLTag('option').addAttr('value',task).setText(task).append(taskSelect);
            i++;
        }
    }

    updateList();
}

export default createTeamRecordsView;