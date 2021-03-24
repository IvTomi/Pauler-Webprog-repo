import { createTeamRecordList,getProjects,getTeams } from "../../../listBuilders/recordListBuilder.js";
import { refreshContent,setUpListField } from "./mainRecord.js";
import HTMLTag from '../../../../utilities/HTMLTag.js';
import RecordData from '../../../../datasets/recordData.js';

function createTeamRecordsView(){
    const content = refreshContent(2);

    const timeFrame = new HTMLTag('select').addAttr('id','timeFrame').addAttr('name','timeFrame').addAttr('value',0).append(content);
    new HTMLTag('option').addAttr('value',0).setText('Elmúlt nap').append(timeFrame);
    new HTMLTag('option').addAttr('value',1).setText('Elmúlt hét').append(timeFrame);
    new HTMLTag('option').addAttr('value',2).setText('Elmúlt hónap').append(timeFrame);
    new HTMLTag('option').addAttr('value',3).setText('Elmúlt év').append(timeFrame);
    
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