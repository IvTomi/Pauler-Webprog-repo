import { router } from "../index.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import createList, { getDummyData } from "../view/listBuilders/adminTeamListBuilder.js";
import { getHeader } from '../utilities/sessionJanitor.js';


export function createAllTeamsList(appendPoint){
    if(sessionStorage.getItem('allTeams')){
        let min = new Date(Date.now()).getMinutes();
        let h = new Date(Date.now()).getHours();
        let savedMin = sessionStorage.getItem('allTeamsRTM') || null;
        let savedH = sessionStorage.getItem('allTeamsRTH') || null;
        if(savedMin && savedH){
            if(min===savedMin && h===savedH){
                data = sessionStorage.getItem('allTeams');
                createList(data,appendPoint);
            }
        }
    }
    makeRequest(/*'/team/list'*/'/test','GET',getHeader(),'{}',(data)=>{onGetTeamsSucces(data,appendPoint)},()=>onAjaxFail());
}

function onGetTeamsSucces(data,appendPoint){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        let toList = data.List;
        toList = getDummyData();
        sessionStorage.setItem('allTeams',JSON.stringify(toList));
        sessionStorage.setItem('allTeamsRTM',new Date(Date.now()).getMinutes());
        sessionStorage.setItem('allTeamsRTH',new Date(Date.now()).getHours());
        createList(toList,appendPoint);
    }
    
}

export function onAjaxFail(){
    alert('Server not found');
}
export function onTeamClicked(team){
    sessionStorage.setItem('activeTeam',JSON.stringify(team));
    router.navigate('teamInfoAdmin')
}
export function onTaskClicked(task){
    sessionStorage.setItem('activeTask',JSON.stringify(task));
     console.log(sessionStorage.getItem('activeTask'));
     /*router.navigate('taskview')*/
}
export function onUserClicked(person){
    sessionStorage.setItem('activeProfile',JSON.stringify(person));
     console.log(sessionStorage.getItem('activeProfile'));
     /*router.navigate('memberprofile')*/
}
export function onDeleteClicked(team){
    makeRequest('/team/remove','POST',getHeader(),JSON.stringify({"teamid":team.Id}),(data)=>{onDeleteSucces(data)},()=>{onAjaxFail()});
}
export function onDeleteSucces(data){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        router.navigate('teamsAdmin');
    }
}
