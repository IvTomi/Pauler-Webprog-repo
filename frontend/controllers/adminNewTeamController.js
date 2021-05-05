import { router } from "../index.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import { addNewMemberToNew, addNonMemberToNew } from "../view/listBuilders/adminTeamListBuilder.js";
import { getHeader } from '../utilities/sessionJanitor.js';

export function onCreate(){
    const teamMembers = [];
    const members = document.getElementById('members');
    for(let element of members.children){
        let member = {};
        member.Id = element.dataset.id;
        member.Tag = document.getElementById('user-info-newtag'+member.Id).value;
        teamMembers.push(member);
    }
    const name = document.getElementById('teamname').value;
    const desc = document.getElementById('desc').value;
    console.log({"Name":name,"Description":desc,"TeamMembers":teamMembers});
    makeRequest('/team/create','POST',getHeader(),JSON.stringify({"Name":name,"Description":desc,"TeamMembers":teamMembers}),(data)=>{onCreateSucces(data),alert('Serve not found')})
    
}

 function onCreateSucces(data){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        router.navigate('teamsAdmin');
    }
}




export function createNonTeamMemberList(users,appendpoint){
    for(let member of users){
        let user = member.User;
        addNonMemberToNew(user,appendpoint);
    }
}




export function onSuccesfulFire(user){
    const list = document.getElementById('members');
    list.removeChild(document.getElementById('user-info'+user.Id));
    const otherList = document.getElementById('nonmembers');
    addNonMemberToNew(user,otherList);
}
export function onSuccesfulHire(user){
    const list = document.getElementById('nonmembers');
    list.removeChild(document.getElementById('user-info'+user.Id));
    const otherList = document.getElementById('members');
    addNewMemberToNew(user,otherList);
}
