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
        let uname = sessionStorage.getItem('username');
        let pass = sessionStorage.getItem('password');
        let admin = document.getElementById('loginForm_admin').checked;
        let hash = sessionStorage.getItem('hash');
        makeRequest('/login','POST',getHeader(),JSON.stringify({"Username":uname,"Password":pass,"Hash":hash,"Admin/User":admin}),(data)=>{
            if(data.Status === 'Failed'){
                alert(data.Message);
            }
            else{
                router.navigate("teamsAdmin");
            }
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

export function getHeader(){
    console.log('getting header');
    return JSON.stringify({"username":sessionStorage.getItem('username'),"password":sessionStorage.getItem('password'),"hash":sessionStorage.getItem('hash')});
}
