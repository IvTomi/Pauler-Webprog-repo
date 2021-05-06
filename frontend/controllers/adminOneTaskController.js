import { router } from "../index.js";
import { makeRequest } from "../utilities/serviceHandler.js";
import { getHeader } from "../utilities/sessionJanitor.js";
import { addNonTaskedToExisting, addTaskedToExisting } from "../view/listBuilders/adminTaskListBuilder.js";

export function onTeamSelectedClicked(taask){
    sessionStorage.setItem('activeTask',taask);
    router.navigate('onetaskAdmin');
}

export function memberDistribution(taskid){
    
    makeRequest('/task/get/users','POST',getHeader(),JSON.stringify({"Taskid":taskid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }
        else{
            let taskmembers = data.Users;
            let taskmemids = [];
            for(let user of taskmembers){
                user = user.User;
                taskmemids.push(user.id);
                console.log(taskmemids);
                makeRequest('/user/list','POST',getHeader(),JSON.stringify({}),(data)=>{
                    if(data.Status === 'Failed'){
                        alert(data.Message);
                    }
                    else{
                        let users = data.Users;
                        for(let user of users){
                            user = user.User;
                            if(taskmemids.includes(user.id)){
                                addTaskedToExisting(user,{},taskid);
                            }
                            else{
                                addNonTaskedToExisting(user,{},taskid);
                            }
                        }
                    }
                },()=>{})   
            }
        }
    },()=>{})
}


export function addUserToexistTask(user,taskid){
    makeRequest('/user/add/task','POST',getHeader(),JSON.stringify({"Userid":user.id,"Taskid":taskid}),()=>{
        let nonmembers= document.getElementById('nonmembers');
        nonmembers.removeChild(document.getElementById('nontaskeduser'+user.id));
        addTaskedToExisting(user,{},taskid);
    },()=>{})
}

export function removeUserFromexistTask(user,taskid){
    makeRequest('/user/add/task','POST',getHeader(),JSON.stringify({"Userid":user.id,"Taskid":taskid}),()=>{
        let members= document.getElementById('members');
        members.removeChild(document.getElementById('taskeduser'+user.id));
        addNonTaskedToExisting(user,{},taskid);
    },()=>{})
}
