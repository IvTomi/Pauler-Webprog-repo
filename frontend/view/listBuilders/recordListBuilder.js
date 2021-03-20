import RecordData from "../../datasets/recordData.js";
import HTMLTag from "../../utilities/HTMLTag.js";


export function createRecordList(data,appendPoint,my){
    if(my){
        for(let team of data){
            for(let task of team.projects){
                for(let record of task.records){
                    if(record.creator==='Grosics'){
                        const cont = new HTMLTag('li').append(appendPoint);
                        new HTMLTag('p').setText(task.name).append(cont);
                        new HTMLTag('p').setText(record.desc).append(cont);
                        new HTMLTag('p').setText(record.date).append(cont);
                        new HTMLTag('p').setText(record.length).append(cont);
                        new HTMLTag('p').setText('X').append(cont);
                    }
                }
            }
        }
    }
    else{
        for(let team of data){
            for(let task of team.projects){
                for(let record of task.records){
                    if(record.creator!=='Grosics'){
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
export function getProjects(){
    const result = [];
    for(let team of new RecordData().recordTestData){
        for(let project of team.projects){
            result.push(project.name);
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