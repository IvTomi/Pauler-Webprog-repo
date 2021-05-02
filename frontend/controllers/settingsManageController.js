import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from './logincontroller.js';
import {modifyButtons} from '../view/listBuilders/adminManageSettingsListBuilder.js';


export function modifyUser(/*userid*/){
    const permissions = document.getElementsByClassName('modifyForm_chb');
    
    const oldpass = document.getElementById('modifyForm_oldpass').value;
    const pass = document.getElementById('modifyForm_pass').value;
    const passAgain = document.getElementById('modifyForm_passAgain').value;
    
    if(oldpass && pass && passAgain === pass){
        
        makeRequest('/user/create','POST',getHeader(),JSON.stringify({/*"userid":userid,*/"password":pass}),(data)=>{modifyUserOnSuccess(data)},()=>{OutPutOnFail()});

        //itt még feltételek és felh módosítása
    }
    for(let i = 0; i < 7; i++){
        if(permissions[i].checked){
            alert(permissions[i].value);
            //itt írja be az adatbázisba a value értékét
        }
        
    }
}
export function getUserPermissions(/*userid*/){
    makeRequest('/user/get/permissions','POST',getHeader(),JSON.stringify({/*"userid":userid,*/}),(data)=>{getUserPermissionsSuccess(data)},()=>{OutPutOnFail()});
}

function getUserPermissionsSuccess(data){
    if(data.Status === 'Failed'){
        if(data.Error === 'InvalidCredentials'){
            console.log('InvalidCredentials');
        }
        else if(data.Error === 'InvalidPermission'){
            console.log('InvalidPermission');
        }
        else if(data.Error === 'UserNotExists'){
            console.log('UserNotExists');
        }
    }
    else if(data.Status === 'Success'){
        modifyButtons(data);
    }
}


function modifyUserOnSuccess(data){
    alert('ok');
}

export function deleteUser(){
    makeRequest('/user/remove','POST',getHeader(),'{}',(data)=>{OnDeleteSuccess(data)},()=>{OutPutOnFail()});

}
function OnDeleteSuccess(data){
    console.log(data);
}

function OutPutOnFail(){
    console.log('hibbaaaa');
}
