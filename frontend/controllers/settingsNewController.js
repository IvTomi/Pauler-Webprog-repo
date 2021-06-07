import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from '../utilities/sessionJanitor.js';
import {createAside} from '../view/listBuilders/asideBuilder.js'


export function addUserToDb(userid){
    let permissions = document.getElementsByClassName('createForm_chb');
    let username = document.getElementById('createForm_username').value;
    let lastname = document.getElementById('createForm_lastname').value;
    let firstname = document.getElementById('createForm_firstname').value;
    let pass = document.getElementById('createForm_pass').value;
    let passAgain = document.getElementById('createForm_passAgain').value
    if(username && lastname && firstname && pass && pass === passAgain){
        //további feltételek akár
        makeRequest('/user/create','POST',getHeader(),JSON.stringify({"Username":username,"Password":pass,"Firstname":firstname,"Lastname":lastname,'Allprivileges':false}),(data)=>{OutputOnSuccess(data)},()=>{OutputOnFail()});
    }  
    
}

function OutputOnSuccess(data){
    if(data.Status === "Failed"){
        alert(data.Message)
    }
    else if(data.Status === "Success"){
        //setPermissions(data.Id)
        createAside();
        clearInput();
    }
}

function ModifyPesmissionSuccess(data){
    if(data.Status === "Failed"){
        alert(data.Message)
    }
    else if(data.Status === "Success"){
    }
}

function setPermissions(userid){
    let permissions = document.getElementsByClassName('createForm_chb');
    for(let i = 0; i < 7; i++){
        if(permissions[i].checked){
            makeRequest('/user/permission/modify','POST',getHeader(),JSON.stringify({"Userid":userid,"Permissionname":permissions[i].value,"Isenabled":true}),(data)=>{ModifyPesmissionSuccess(data)},()=>{OutputOnFail()});
        }
        else{
            makeRequest('/user/permission/modify','POST',getHeader(),JSON.stringify({"Userid":userid,"Permissionname":permissions[i].value,"Isenabled":false}),(data)=>{ModifyPesmissionSuccess(data)},()=>{OutputOnFail()});
    
        }
        
    }
}

function clearInput(){
    document.getElementById('createForm_username').value = "";
    document.getElementById('createForm_lastname').value = "";
    document.getElementById('createForm_firstname').value = "";
    document.getElementById('createForm_pass').value= "";
    document.getElementById('createForm_passAgain').value= ""
}

function OutputOnFail(){
    alert('hiba');
}