import RecordData from "../../datasets/recordData.js";
import HTMLTag from "../../utilities/HTMLTag.js";
import {hasDatePassed} from '../../utilities/dateHandling.js';


export function createMyRecordList(data,appendPoint,options){
    const dateBase = options.timeframe || '1900/01/01';
    //const name = '*'+options.name+'*';//regex-é alakítás
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
export function createTeamRecordList(data,appendPoint,options){
    const dateBase = options.timeframe || '1900/01/01';
    if(!data || !appendPoint){
        return false; //Hiányzó adat a fgv-hez
    }
    for(let team of data){
        if( (options.team && team.name===options.team) || !options.team){
            for(let task of team.projects){
                if((options.task && task.name===options.task) || !options.task){
                    for(let record of task.records){
                        if(record.creator!=='Grosics'){
                            if(hasDatePassed(dateBase,record.date)){
                                const cont = new HTMLTag('li').append(appendPoint);
                                new HTMLTag('p').setText(record.creator).append(cont);
                                new HTMLTag('p').setText(record.desc).append(cont);
                                new HTMLTag('p').setText(record.date).append(cont);
                                new HTMLTag('p').setText(record.length).append(cont);
                            }
                        }
                    }
                }
            }
        }
        
    }
}
export function getProjects(selectedTeam){
    const result = [];
    for(let team of new RecordData().recordTestData){
        if((selectedTeam && selectedTeam===team.name) || !selectedTeam){
            for(let project of team.projects){
                result.push(project.name);
            }
        }
    }
    return result;
}

export function getTeams(){
    const result = [];
    for(let team of new RecordData().recordTestData){
        result.push(team.name);
    }
    return result;
}