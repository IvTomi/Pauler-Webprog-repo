import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import {createMyTeamsList} from '../view/listBuilders/teamListBuilder.js'
import createmyTeamsView from '../view/content/user/teams/myTeamsU.js';
import teamData from '../datasets/teamData.js';


export function AllTeamList(){
    makeRequest('/team/list','POST',getHeader(),"{}",(data)=>{onGetTeamsSucces(data)},()=>onAjaxFail());

}
function onGetTeamsSucces(data){
    console.log(data);
    createmyTeamsView(data.Teams);
}

function onAjaxFail(){
    console.log('onAjaxFail');
}