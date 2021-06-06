import HTMLTag from './HTMLTag.js';

export function makeTimeframeSelect(id,appendPoint,options){
    let time;
    if(options){
        if(options.endDate){
             time = Date.parse(options.endDate);
        }
        else{
             time = Date.now();
        }
    }
    else{
         time = Date.now();
    }
    
    let date = new Date(time);
    let dateInFormat = Dateformat(date);
    const timeFrame = new HTMLTag('select').addAttr('id',id).addAttr('name',id).addAttr('value',0).append(appendPoint);
    new HTMLTag('option').addAttr('value',0).setText('Időtartam választása').append(timeFrame);
    new HTMLTag('option').addAttr('value',getPreviousDay(dateInFormat)).setText('Elmúlt nap').append(timeFrame);
    new HTMLTag('option').addAttr('value',getPreviousWeek(dateInFormat)).setText('Elmúlt hét').append(timeFrame);
    new HTMLTag('option').addAttr('value',getPreviousMonth(dateInFormat)).setText('Elmúlt hónap').append(timeFrame);
    new HTMLTag('option').addAttr('value', getPreviousYear(dateInFormat)).setText('Elmúlt év').append(timeFrame);
    return timeFrame.node; //select HTMLElement-et adja vissza;
}

export default makeTimeframeSelect;



function Dateformat(date){
    return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate();
}

function getPreviousDay(dateInFormat){
    const array = dateInFormat.split('/');
    let year = parseInt(array[0]);
    let month = parseInt(array[1]);
    let day = parseInt(array[2]);
    if(day === 1){
        const result = goOverMonth(year,month,day,1);
        return result[0]+'/'+result[1]+'/'+result[2];
    }
    day -=1;
    return year+'/'+month+'/'+day;
}

function getPreviousWeek(dateInFormat){
    const array = dateInFormat.split('/');
    let year = parseInt(array[0]);
    let month = parseInt(array[1]);
    let day = parseInt(array[2]);
    if(day <= 7){
        const result = goOverMonth(year,month,day,7);
        return result[0]+'/'+result[1]+'/'+result[2];
    }
    day -=7;
    return year+'/'+month+'/'+day;
}

function goOverMonth(year,month,day, substract){
    if(month === 1){
        year -= 1;
        month = 12;
        substract = substract - day;
        day = 31-substract;
    }
    else if(month === 2 || month === 4 || month === 6 || month === 8 || month === 9 || month === 11  ){
        month -= 1;
        substract = substract - day;
        day = 31-substract;
    }
    else if(month === 5 || month === 7 || month === 10 || month === 12){
        month -= 1;
        substract = substract - day;
        day = 30-substract;
    }
    else{//month===3
        month -= 1;
        substract = substract - day;
        if(year%4 === 0 && (year%100 !== 0 || year%400 ===0)){
            day = 29-substract;
        }
        else{
            day = 28-substract;
        }
    }
    return [year,month,day];
}

function getPreviousMonth(dateInFormat){
    const array = dateInFormat.split('/');
    let year = parseInt(array[0]);
    let month = parseInt(array[1]);
    let day = parseInt(array[2]);
    if(month === 1){
        return (year-1)+'/12/'+day;
    }
    else{
        const result = goOverMonth(year,month,day,30);
        return result[0]+'/'+result[1]+'/'+result[2];
    }
}

function getPreviousYear(dateInFormat){
    const array = dateInFormat.split('/');
    let year = parseInt(array[0]);
    let month = parseInt(array[1]);
    let day = parseInt(array[2]);
    return (year-1)+'/'+month+'/'+day;
}

export function hasDatePassed(base,actual){
    let array = base.split('/');
    let baseYear = parseInt(array[0]);
    let baseMonth = parseInt(array[1]);
    let baseDay = parseInt(array[2]);
    array = actual.split('/');
    let actualYear = parseInt(array[0]);
    let actualMonth = parseInt(array[1]);
    let actualDay = parseInt(array[2]);
    if(actualYear>baseYear){
        return true;
    }
    else if(actualYear<baseYear){
        return false;
    }
    else{
        if(actualMonth>baseMonth){
            return true;
        }
        else if(actualMonth<baseMonth){
            return false;
        }
        else{
            if(actualDay>=baseDay){
                return true;
            }
            else{
                return false;
            }
        }
    }
}