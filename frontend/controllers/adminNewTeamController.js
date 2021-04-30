import { router } from "../index.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import { addNewMemberToNew, addNonMemberToNew } from "../view/listBuilders/adminTeamListBuilder.js";
import { getHeader } from "./logincontroller.js";

export function onCreate(){
    const memberids = [];
    const members = document.getElementById('members');
    for(let element of members.children){
        memberids.push(element.dataset.id);
    }
    const name = document.getElementById('teamname').value;
    const desc = document.getElementById('desc').value;
    makeRequest('/team/create','POST',getHeader(),JSON.stringify({"Name":name,"Description":desc,"Ids":memberids}),(data)=>{onCreateSucces(data),alert('Serve not found')})
    console.log(memberids);
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
    console.log(user);
    const list = document.getElementById('members');
    list.removeChild(document.getElementById('user-info'+user.Id));
    const otherList = document.getElementById('nonmembers');
    addNonMemberToNew(user,otherList);
}
export function onSuccesfulHire(user){
    console.log(user);
    const list = document.getElementById('nonmembers');
    list.removeChild(document.getElementById('user-info'+user.Id));
    const otherList = document.getElementById('members');
    addNewMemberToNew(user,otherList);
}
