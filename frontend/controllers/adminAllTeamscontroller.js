import { router } from "../index.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import { getHeader } from '../utilities/sessionJanitor.js';


/*export function createAllTeamsList(appendPoint){
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
    }

function onGetTeamsSucces(data,appendPoint){
    
    
}*/

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
    console.log(team);
    makeRequest('/team/delete','POST',getHeader(),JSON.stringify({"TeamId":team.id}),(data)=>{onDeleteSucces(data)},()=>{onAjaxFail()});
}
export function onDeleteSucces(data){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        router.navigate('teamsAdmin');
    }
}
