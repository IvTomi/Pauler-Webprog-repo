import {router} from '../index.js';
import {makeRequest, onRequestFailed} from '../utilities/serviceHandler.js';
import {setSessionHash} from './logincontroller.js'
import {getHeader} from '../utilities/sessionJanitor.js'

export function sendRegister(){

    let companyName = document.getElementById('signupForm_company').value
    let username = document.getElementById('signupForm_username').value
    let password = document.getElementById('signupForm_pass').value
    let passwordrepeat = document.getElementById('signupForm_passAgain').value
    let email = document.getElementById('signupForm_mail').value;

    if(checkInput(companyName,username,password,passwordrepeat,email))

    makeRequest('/register','POST',getHeader(),JSON.stringify({"Username":username,"Password":password,"Company":companyName,"Email":email}),(data)=>{
        if(data.Status === 'Failed'){
            if(data.ErrorCode == 2){
                onRequestFailed('Az email cím már foglalt')
            }else{
                
                onRequestFailed(data.ErrorCode + '\n' + data.Message)
            }
        }
        else{
            alert(`A cég azonosítója:\n${data.Hash}`)
            setSessionHash(data.Hash)
            router.navigate('login')
            
        }
    },(req,err)=>{
        console.log(err);
    })  
}
   



function checkInput(companyName,username,password,passwordrepeat,email){
    if(!companyName || !username || !password || !passwordrepeat || !email){
        alert('Töltsön ki minden mezőt')
        return false
    }
    if(companyName.length>45){
        alert('Túl hosszú cég név (max 45 karakter)')
        return false
    }

    if(username.length>45){
        alert('Túl hosszú felhasználó név (max 45 karakter)')
        return false
    }
    console.log(password + passwordrepeat)
    if(password != passwordrepeat){
        alert('Jelszavak nem egyeznek')
        return false
    }

    return true;
}