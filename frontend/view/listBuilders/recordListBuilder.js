import RecordData from "../../datasets/recordData.js";
import HTMLTag from "../../utilities/HTMLTag.js";
import {hasDatePassed} from '../../utilities/dateHandling.js';
import {SessionJanitor,getHeader} from '../../utilities/sessionJanitor.js';
import {makeRequest} from '../../utilities/serviceHandler.js';


export function createMyRecordList(data,appendPoint,options){
    //const name = '*'+options.name+'*';//regex-é alakítás
    let userid = SessionJanitor.getSessionUser().id;
    makeRequest('/user/get/records','POST',getHeader(),JSON.stringify({"Userid":userid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }
        else{
            
            let records = []
            if(options['timeframe']){
                console.log(options['timeframe'])
                records = data.Records.filter((x)=>{return Date.parse(x.Record.recorddate) >= Date.parse(options['timeframe'])})
            }else{
                records = data.Records
            }

            SessionJanitor.getAllTasks(()=>{CreateElements(records,appendPoint,options);  })
                  
        }
    },(req,err)=>{
        console.log(err);
    })    
    
}
export function CreateElements(data,appendPoint,options){
    if(!data || !appendPoint){
        return false; //Hiányzó adat a fgv-hez
    }
    appendPoint.innerHTML = "";


    for(let record of data){
        let task = SessionJanitor.getAllTasks(null).find(x=>x['Task'].id == record['Record']['taskid'])
            var appear = true;
            if(options['filter']){
                appear = task.Task.taskname.indexOf(options['filter'])===0
            }
            if(appear){
                const cont = new HTMLTag('li').addAttr('class','listItem').append(appendPoint);
                new HTMLTag('button').setText('Töröl').addAttr('class','deleteButton').append(cont).onclick(()=>{deleteRecord(record['Record']['id'],appendPoint,options)});
                new HTMLTag('p').setText(task['Task'].taskname).append(cont);
                new HTMLTag('p').setText(record.desc).append(cont);
                new HTMLTag('p').setText(record['Record']['comment']).append(cont);
                new HTMLTag('p').setText(record['Record']['hour']+':'+record['Record']['min']).append(cont);
                new HTMLTag('p').setText(record['Record']['recorddate']).append(cont);
            }
        }
}


function deleteRecord(id,appendpoint,datain){
    makeRequest('/record/remove','POST',getHeader(),JSON.stringify({"Recordid":id}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }
        else{   
            createMyRecordList(null,appendpoint,datain)
            
        }           
    },(req,err)=>{
        console.log(err);
    }) 
}

export function createTeamRecordList(recordlist,appendpoint,options){
    for(let team of data){
        for(let task of team.projects){
            for(let record of task.records){
                if(record.creator==='Grosics'){
                    if(task.name  && record.date && record.length){
                        if(hasDatePassed(dateBase,record.date)){
                            const cont = new HTMLTag('li').append(appendPoint);
                            new HTMLTag('p').setText(task.name).append(cont);
                            new HTMLTag('p').setText(record.desc).append(cont);
                            new HTMLTag('p').setText(record.date).append(cont);
                            new HTMLTag('p').setText(record.length).append(cont);
                            new HTMLTag('button').setText('X').append(cont);
                        }
                    }
                }
            }
        }
    }
}
export function getProjects(callback,root){
    let userid = SessionJanitor.getSessionUser().id
    makeRequest('/user/get/tasks','POST',getHeader(),JSON.stringify({"Userid":userid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }
        else{   
            console.log(data.Tasks)
            if(callback){
                callback(data.Tasks,root)
            }
            
        }           
    },(req,err)=>{
        console.log(err);
    })  
}

export function getTeams(){
    const result = [];
    for(let team of new RecordData().recordTestData){
        result.push(team.name);
    }
    return result;
}