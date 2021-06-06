import {router} from '../index.js';
import {makeRequest, onRequestFailed} from '../utilities/serviceHandler.js';
import {mapUser} from '../factory/userfactory.js'
import {SessionJanitor,getHeader} from '../utilities/sessionJanitor.js'

export function setSessionHash(hash){
    if(!hash){
        sessionStorage.setItem('hash',document.getElementById('hashForm_hash').value)

    }else{
        sessionStorage.setItem('hash',hash)
    }
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
        makeRequest('/login','POST',getHeader(),JSON.stringify({"Username":uname,"Password":pass,"Isadmin":admin}),(data)=>{
            if(data.Status === 'Failed'){
                onRequestFailed(data.Message);
            }
            else{
                console.log(data.User)
                SessionJanitor.setSessionstate(admin);
                SessionJanitor.setSessionUser(mapUser(data.User),()=>{
                    admin?router.navigate('ProfileAdmin'):router.navigate('ProfileUser')
                })
               
                
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

