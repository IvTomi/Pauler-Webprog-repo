import HTMLTag from "../../../../utilities/HTMLTag.js";
import changeHighlithed from '../../../../utilities/changeHighlighted.js';
import RecordData from "../../../../datasets/recordData.js";
import viewController from "../../../../controllers/viewController.js";
import {createRecordList,getProjects,getTeams} from "../../../listBuilders/recordListBuilder.js";


class UserRecordView{
    constructor(){
        this.main = document.getElementsByTagName('main')[0];
        const navList = document.querySelector('nav ul');
        changeHighlithed(0,navList);
    }
    setUp(){
        this.selecter=new HTMLTag('ul').addAttr('id','selecter').append(this.main);
        this.content=new HTMLTag('content').addAttr('id','content').append(this.main);
        
        new HTMLTag('li').setText('Rekord hozzáadása').append(this.selecter).onclick(this.createNewRecord);
        new HTMLTag('li').setText('Rekordjaim').append(this.selecter).onclick(this.createMyRecords);
        new HTMLTag('li').setText('Csapattagok rekordjai').append(this.selecter).onclick(this.createTeamRecords);
    }

    createNewRecord(){
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



    createMyRecords(){
        const content = refreshContent(1);

        const timeFrame = new HTMLTag('select').addAttr('id','timeFrame').addAttr('name','timeFrame').addAttr('value',0).append(content);
        new HTMLTag('option').addAttr('value',0).setText('Elmúlt nap').append(timeFrame);
        new HTMLTag('option').addAttr('value',1).setText('Elmúlt hét').append(timeFrame);
        new HTMLTag('option').addAttr('value',2).setText('Elmúlt hónap').append(timeFrame);
        new HTMLTag('option').addAttr('value',3).setText('Elmúlt év').append(timeFrame);
        new HTMLTag('input').addAttr('id','search').addAttr('name','search').addAttr('placeholder','keresés projektnév alapján').addAttr('type','text').append(content);
        let listDiv = document.getElementById('list');
        if(listDiv){
            new viewController().clearTag(listDiv);
        }
        else{
            listDiv = document.createElement('ul');
            listDiv.setAttribute('id','list');
            listDiv.classList.add('scroll');
            content.appendChild(listDiv);
        }
        createRecordList(new RecordData().recordTestData,listDiv,true);
    }



    createTeamRecords(){
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

        let listDiv = document.getElementById('list');
        if(listDiv){
            new viewController().clearTag(listDiv);
        }
        else{
            listDiv = document.createElement('ul');
            listDiv.setAttribute('id','list');
            listDiv.classList.add('scroll');
            content.appendChild(listDiv);
        }
        createRecordList(new RecordData().recordTestData,listDiv,false);
    }
}

function refreshContent(n){
    const selecters = document.getElementById('selecter');
    changeHighlithed(n,selecters);
    const content = document.getElementById('content');
    new viewController().clearTag(content);
    return content;
}


export default UserRecordView;