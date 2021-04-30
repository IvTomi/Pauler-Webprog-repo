import HTMLTag from '../utilities/HTMLTag.js';
import {makeRequest} from '../utilities/serviceHandler.js';
import {router} from '../index.js';
import { getHeader } from './logincontroller.js';
import {HTMLview} from '../view/listBuilders/userProfileListBuilder.js';


export function allUsers(userid){
    makeRequest('/user/list','POST',getHeader(),'{}',(data)=>{OnListSuccess(data,userid)},()=>{OnListFail()});

}

function OnListSuccess(data,userid){
    HTMLview(data,userid);
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

    makeRequest('/user/remove/contact','POST',getHeader(),JSON.stringify({"userid":userid,"contactid":contactid}),(data)=>{OnRemoveSuccess(data)},()=>{OnRemoveFail()});

}

function OnRemoveSuccess(data){console.log("sucessdelete" + data);}

function OnRemoveFail(){console.log("faildelete");}


export function getContacts(userid){

    makeRequest('/user/get/contacts','POST',getHeader(),JSON.stringify({"userid":userid}),(data)=>{getContactsSuccess(data)},()=>{getContactsFail()});

}

function getContactsSuccess(){}

function getContactsFail(){}

export function CreateContact(userid){
    let typeRead = document.getElementById('type').value;
    let valueRead = document.getElementById('value').value;
    if(typeRead && valueRead){
        makeRequest('/contact/create','POST',getHeader(),JSON.stringify({"typename":typeRead,"value":valueRead,"description":"","ispublic":"true"}),(data)=>{CreateContactSuccess(data,userid)},()=>{CreateContactFail()});
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
