import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';

import {SessionJanitor} from "../utilities/sessionJanitor.js";
import {createProfile} from "../view/listBuilders/profileListBuilder.js";
import {createAside} from '../view/listBuilders/asideBuilder.js'

export function modifyUser(/*userid*/){
    
    let pass = document.getElementById('modifyForm_pass').value;
    let passAgain = document.getElementById('modifyForm_passAgain').value;
    let firstname = document.getElementById('modifyForm_firstname').value;
    let lastname = document.getElementById('modifyForm_lastname').value;
    let ispass;
    if(pass){
        ispass = true
        if(passAgain != pass){
            alert('Jelszavak nem egyeznek')
            return;
        }
    }else{
        ispass = false
    }

    if(SessionJanitor.getActiveProfile()){
        
        let user = SessionJanitor.getActiveProfile()
        makeRequest('/user/modify','POST',getHeader(),JSON.stringify({"Userid":user.id,"Password":ispass?pass:null,"Firstname":firstname,"Lastname":lastname}),(data)=>{modifyUserOnSuccess(data,user)},(data)=>{OutPutOnFail(data)});
        //itt még feltételek és felh módosítása
    }else{
        alert('Nincs felhasználó kiválasztva')
    }
}


export function initProfiles(appendPoint){
    let profiles;
    if(SessionJanitor.getAllUsers(null)){
        profiles = SessionJanitor.getAllUsers(null);
    }else{
        SessionJanitor.getAllUsers(()=>{initProfiles()});
    }
    profiles.forEach(element => {
        createProfile(element,appendPoint);
    });
}

export function resetInputData(){
    let profile = SessionJanitor.getActiveProfile();
    console.log(profile)
    if(profile){
        document.getElementById('modifyForm_firstname').value = profile.firstname
        document.getElementById('modifyForm_lastname').value = profile.lastname
        getUserPermissions(profile.id)
    }else{modifyUserOnSuccess
        document.getElementById('modifyForm_firstname').value = ""
        document.getElementById('modifyForm_lastname').value = ""
        getUserPermissions(null)
    }
    document.getElementById('modifyTitle').textContent = profile?profile.username:"Nincs felhasználó kiválasztva"
    document.getElementById('modifyForm_pass').value = ""
    document.getElementById('modifyForm_passAgain').value = ""
    

}

export function getUserPermissions(userid){

    if(userid){
        makeRequest('/user/get/permissions','POST',getHeader(),JSON.stringify({"Userid":userid}),(data)=>{getUserPermissionsSuccess(data)},(data)=>{OutPutOnFail(data)});
    }else{
        document.getElementsByClassName('modifyForm_chb').forEach(x=>x.checked = false);
    }
   

}

function setPermissions(userid){
    let permissions = document.getElementsByClassName('modifyForm_chb');
    for(let item of permissions){
        if(item.checked){
            //makeRequest('/user/permission/modify','POST',getHeader(),JSON.stringify({"Userid":userid,"Permissionname":item.value,"Isenabled":true}),(data)=>{modifyPermissionOnSuccess(data)},(data)=>{OutputOnFail(data)});
        }
        else{
            //makeRequest('/user/permission/modify','POST',getHeader(),JSON.stringify({"Userid":userid,"Permissionname":item.value,"Isenabled":false}),(data)=>{modifyPermissionOnSuccess(data)},(data)=>{OutputOnFail(data)});
    
        }      
        console.log(item)
    }

   
}

function modifyPermissionOnSuccess(data){
    let permissions = document.getElementsByClassName('modifyForm_chb');
    if(data.Status === 'Failed'){
        alert(data.Message)
    }
    else if(data.Status === 'Success'){
        data.Permissions.forEach(e=>{
            for(let item of permissions){
                //console.log(item.value)
                if(item.value === e['Permission']['permissionname']){
                    item.checked = e['Permission']['isenabled']
                }
            }
        })
    }
}

const timer = ms => new Promise(res => setTimeout(res, ms))


function getUserPermissionsSuccess(data){

}


function modifyUserOnSuccess(data,user){  
    SessionJanitor.getAllUsers(()=>{location.reload();})
    
}

export function deleteUser(){
    makeRequest('/user/remove','POST',getHeader(),'{}',(data)=>{OnDeleteSuccess(data)},()=>{OutPutOnFail()});

}
function OnDeleteSuccess(data){
    console.log(data);
}

function OutPutOnFail(data){
    console.log(data)
}
