import { router } from "../index.js";
import { makeRequest, onRequestFailed } from "../utilities/serviceHandler.js";
import { addNewMemberToNew, addNonMemberToNew } from "../view/listBuilders/adminTeamListBuilder.js";
import { getHeader } from '../utilities/sessionJanitor.js';
import {SessionJanitor} from '../utilities/sessionJanitor.js';

export function onCreate(){
    
    const name = document.getElementById('teamname').value;
    const desc = document.getElementById('desc').value;
    makeRequest('/team/create','POST',getHeader(),JSON.stringify({"Name":name,"Description":desc,"TeamMembers":[]}),(data)=>{onCreateSucces(data)},()=>{alert('Serve not found')})
    
}

 function onCreateSucces(data){
    if(data.Status === 'Failed'){
        onRequestFailed(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        let teamId = data.Id;
        const teamMembers = [];
        const members = document.getElementById('members');
        for(let element of members.children){
            let member = {};
            member.Id = element.dataset.id;
            member.Tags = document.getElementById('user-info-newtag'+member.Id).value;
            teamMembers.push(member);
        }
        for(let member of teamMembers){

            
            console.log(teamMembers);
            console.log(member.Tags);
            makeRequest('/team/add/user','POST',getHeader(),JSON.stringify({"Teamid":teamId,"Memberid":member.Id,"Tag":member.Tags}),(data)=>{
                if(data.Status === 'Failed'){
                    onRequestFailed(data.Message);
                }
            },()=>{alert('Serve not found')})
    
        }
        setTimeout(()=>{router.navigate('teamsAdmin');},1000);
        
    }
}




export function createNonTeamMemberList(users,appendpoint){
    
    for(let member of users){
        addNonMemberToNew(member,appendpoint);
    }
}




export function onSuccesfulFire(user){
    const list = document.getElementById('members');
    list.removeChild(document.getElementById('user-info'+user.id));
    const otherList = document.getElementById('nonmembers');
    addNonMemberToNew(user,otherList);
}
export function onSuccesfulHire(user){
    const list = document.getElementById('nonmembers');
    list.removeChild(document.getElementById('user-info'+user.id));
    const otherList = document.getElementById('members');
    addNewMemberToNew(user,otherList);
}
