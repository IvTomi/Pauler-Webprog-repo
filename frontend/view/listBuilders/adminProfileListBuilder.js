import HTMLTag from '../../utilities/HTMLTag.js';
import {makeRequest} from '../../utilities/serviceHandler.js';
import {getHeader} from '../../utilities/sessionJanitor.js';
import { router } from '../../index.js';

export function getCompanyName(){
    makeRequest('/company/name','GET',getHeader(),JSON.stringify({"companyname":company.name}),(data)=>{onNameSuccess(data)},()=>{onNameFail()});
}

function onNameSuccess(data){
    const appendPoint = document.getElementsById('content');
    new HTMLTag('h1').setText(data.name).append(appendPoint);
}
function onNameFail(){
    alert('fail');
    router.navigate('login');
}


export function getCompanyContacts(appendPoint){ 
    
    
    
    //lekéri az adatbázisból a kontaktokat -> 
    //fail: 
    //success: onCompanyContactsSuccess

}
function onCompanyContactsSuccess(data){
    const frame = new HTMLTag('div');
    const one = new HTMLTag('div');
    for(let contact of data){
        //ha van jogosultsága törölni
        new HTMLTag('button').setText('X').append('id',data.id).append(one).onclick(()=>deleteContact(this.data));

        new HTMLTag('p').setText(data.type).append(one);
        new HTMLTag('p').setText(data.value).append(one);
        one.append(frame);
    }
    const appendPoint = document.getElementsById('content');
    frame.append(appendPoint);
}

function onCompanyContactsFail(){
    alert('fail');
    router.navigate('login');
}



export function addNewContact(type,value){

    if(type && value){
        console.log('adatbázisba írás');

    }
}

export function deleteContact(data){

    console.log('delete');

}