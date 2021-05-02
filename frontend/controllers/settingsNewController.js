import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from './logincontroller.js';



export function addUserToDb(userid){
    const permissions = document.getElementsByClassName('createForm_chb');
    const username = document.getElementById('createForm_username').value;
    const lastname = document.getElementById('createForm_lastname').value;
    const firstname = document.getElementById('createForm_firstname').value;
    const pass = document.getElementById('createForm_pass').value;
    const passAgain = document.getElementById('createForm_passAgain').value
    if(username && lastname && firstname && pass && pass === passAgain){
        //további feltételek akár
        makeRequest('/user/create','POST',getHeader(),JSON.stringify({"username":username,"password":pass,"firstname":firstname,"lastname":lastname}),(data)=>{OutputOnSuccess(data)},()=>{OutputOnFail()});
    }
    for(let i = 0; i < 7; i++){
        if(permissions[i].checked){
            makeRequest('/user/create','POST',getHeader(),JSON.stringify({"username":username,"permissionname":permissions[i].value,"isenabled":true}),(data)=>{ModifyPesmissionSuccess(data)},()=>{OutputOnFail()});
        }
        else{
            makeRequest('/user/create','POST',getHeader(),JSON.stringify({"username":username,"permissionname":permissions[i].value,"isenabled":false}),(data)=>{ModifyPesmissionSuccess(data)},()=>{OutputOnFail()});
    
        }
        
    }
    
}

function OutputOnSuccess(data){
    if(data.Status === "Failed"){
        alert('nope');
    }
    else if(data.Status === "Success"){
        alert('ok');
    }
}

function ModifyPesmissionSuccess(data){
    if(data.Status === "Failed"){
        alert('nope');
    }
    else if(data.Status === "Success"){
        alert('ok');
    }
}

function OutputOnFail(){
    alert('hiba');
}