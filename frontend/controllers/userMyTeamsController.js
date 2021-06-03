
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import createmyTeamsView from '../view/content/user/teams/myTeamsU.js';
import { createMyTeamsList } from '../view/listBuilders/userTeamListBuilder.js';


export function getUserTeams(){
    makeRequest('/user/get/teams','POST',getHeader(),"{}",(data)=>{onGetTeamsSucces(data)},()=>onAjaxFail());

}

export function onTeamClicked(team){
    sessionStorage.setItem('activeTeam',JSON.stringify(team));
    router.navigate('oneTeamUser') ;
}
function onGetTeamsSucces(data){
    if(data.Status === 'Failed'){
        alert(data.Message);
    }
    else{
        createMyTeamsList(data.Teams);
    }
}

function onAjaxFail(){
    console.log('onAjaxFail');
}