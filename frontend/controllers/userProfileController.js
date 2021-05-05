import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader, SessionJanitor } from '../utilities/sessionJanitor.js';
import {HTMLview} from '../view/listBuilders/userProfileListBuilder.js';


export function allUsers(userid){
    makeRequest('/user/list','POST',getHeader(),'{}',(data)=>{OnListSuccess(data,userid)},()=>{OnListFail()});

}

function OnListSuccess(data,userid){
    //HTMLview(data,userid);
}

function OnListFail(){
    console.log('hibbaaaa');
}


export function addContact(){

    makeRequest('/user/add/contact','POST',getHeader(),JSON.stringify({/*"userid":user.id,"contactid":contact.id*/}),(data)=>{OnAddSuccess(data)},()=>{OnAddFail()});

}
function OnAddSuccess(){
    
}

function OnAddFail(){
    
}


export function removeContact(userid,contactid){

    makeRequest('/user/contact/remove','POST',getHeader(),JSON.stringify({'Userid':userid,'Contactid':contactid}),(data)=>{
        if(data.Status === 'Failed'){
            alert(data.Message);
        }
        else{  
            SessionJanitor.getAllUsers(()=>{HTMLview(SessionJanitor.getAllUsers(null),userid?userid:SessionJanitor.getSessionUser().id)})
        }           
    },(req,err)=>{
        console.log(err);
    }) 

}

function OnRemoveSuccess(data){console.log("sucessdelete" + data);}

function OnRemoveFail(){console.log("faildelete");}


export function getContacts(userid){

    makeRequest('/user/get/contacts','POST',getHeader(),JSON.stringify({"userid":userid}),(data)=>{getContactsSuccess(data)},()=>{getContactsFail()});

}

function getContactsSuccess(){}

function getContactsFail(){}

export function CreateContact(userid){
    let typeRead = document.getElementById('contacttype').value;
    let valueRead = document.getElementById('contactvalue').value;
    let commentRead = document.getElementById('contactcomment').value;
    if(typeRead && valueRead){
        makeRequest('/user/contact/create','POST',getHeader(),JSON.stringify({'Userid':userid,'Typename':typeRead,'Value':valueRead,'Comment':commentRead?commentRead:null}),(data)=>{
            if(data.Status === 'Failed'){
                alert(data.Message);
            }
            else{  
                SessionJanitor.getAllUsers(()=>{HTMLview(SessionJanitor.getAllUsers(null),userid?userid:SessionJanitor.getSessionUser().id)})
            }           
        },(req,err)=>{
            console.log(err);
        }) 
    }
}

function CreateContactSuccess(data,userid){
    
    makeRequest('/user/add/contact','POST',getHeader(),JSON.stringify({"userid":userid,"contactid":data.contactid}),(data)=>{addContactSuccess(data)},()=>{addContactFail()});

}

function CreateContactFail(){
    alert("Fail ág");
}

function addContactSuccess(data){
    //feltétélek
}

function addContactFail(){
    alert("Fail ág");
}
