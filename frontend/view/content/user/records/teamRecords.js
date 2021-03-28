import { createTeamRecordList,getProjects,getTeams } from "../../../listBuilders/recordListBuilder.js";
import { refreshContent,setUpListField } from "./mainRecord.js";
import HTMLTag from '../../../../utilities/HTMLTag.js';
import RecordData from '../../../../datasets/recordData.js';
import makeTimeframeSelect from '../../../../utilities/dateHandling.js';

function createTeamRecordsView(){
    const content = refreshContent(2);

    const timeframe = makeTimeframeSelect('timeFrame',content);
    
    const teamSelect = new HTMLTag('select').addAttr('id','teamSelect').addAttr('name','teamSelect').addAttr('value',-1).append(content);
    new HTMLTag('option').addAttr('value',-1).setText('Csapat kiválasztása').append(teamSelect);
    let i = 0;
    for(let team of getTeams()){
        new HTMLTag('option').addAttr('value',i).setText(team).append(teamSelect);
        i++;
    }
    
    const taskSelect = new HTMLTag('select').addAttr('id','taskSelect').addAttr('name','taskSelect').addAttr('value',-1).append(content);
    new HTMLTag('option').addAttr('value',-1).setText('Feladat kiválasztása').append(taskSelect);
    i=0;
    for(let task of getProjects()){
        new HTMLTag('option').addAttr('value',i).setText(task).append(taskSelect);
        i++;
    }

    let listDiv = setUpListField(content);
    createTeamRecordList(new RecordData().recordTestData,listDiv,null);
}

export default createTeamRecordsView;