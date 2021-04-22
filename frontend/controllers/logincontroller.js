import {router} from '../index.js';
import {makeRequest} from '../utilities/serviceHandler.js';

export function setSessionHash(){
    sessionStorage.setItem('hash',document.getElementById('hashForm_hash').value)
    console.log(sessionStorage.getItem('hash'));
    router.navigate('login');
}

export function clearSessionHash(){
    sessionStorage.removeItem('hash');
    router.navigate('login');
}

export function sendLogIn(){
    if(setSessionDataFromLoginForm()){
        makeRequest('/test','GET',getHeader(),'{}',(data)=>{
            console.log(data);
        },(req,err)=>{
            console.log(err);
        })  
    }
   
}

function setSessionDataFromLoginForm(){
    if(document.getElementById('loginForm_username').value && document.getElementById('loginForm_passwd').value){       
        sessionStorage.setItem('username',document.getElementById('loginForm_username').value);
        sessionStorage.setItem('password',document.getElementById('loginForm_passwd').value);
        return true;
    }
    return false;
    
}

function getHeader(){
    console.log('asd');
    return JSON.stringify({"username":sessionStorage.getItem('username'),"password":sessionStorage.getItem('password'),"hash":sessionStorage.getItem('hash')});
}
