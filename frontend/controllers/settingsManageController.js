import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from './logincontroller.js';


export function modifyUser(){
    const permissions = document.getElementsByClassName('modifyForm_chb');
    
    const oldpass = document.getElementById('modifyForm_oldpass').value;
    const pass = document.getElementById('modifyForm_pass').value;
    const passAgain = document.getElementById('modifyForm_passAgain').value;
    
    if(oldpass && pass && passAgain === pass){
        
        makeRequest('/user/create','POST',getHeader(),JSON.stringify({/*"userid":userid,*/"password":pass}),(data)=>{modifyUserOnSuccess(data)},()=>{modifyUserOnFail()});

        //itt még feltételek és felh módosítása
    }
    for(let i = 0; i < 7; i++){
        if(permissions[i].checked){
            alert(permissions[i].value);
            //itt írja be az adatbázisba a value értékét
        }
        
    }
}

function modifyUserOnSuccess(data){
    alert('ok');
}

function modifyUserOnFail(){
    alert(fail);
}

export function deleteUser(){
    makeRequest('/user/remove','POST',getHeader(),'{}',(data)=>{OnDeleteSuccess(data)},()=>{OnDeleteFail()});

}
function OnDeleteSuccess(data){
    console.log(data);
}

function OnDeleteFail(){
    console.log('hibbaaaa');
}
