import HTMLTag from "../../utilities/HTMLTag.js";


function createRecordList(data,appendPoint,my){
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

export default createRecordList;