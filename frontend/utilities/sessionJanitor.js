import {mapUser} from '../factory/userfactory.js'
import {mapContact} from '../factory/userfactory.js'
import {mapPermission} from '../factory/userfactory.js'
import {makeRequest} from './serviceHandler.js'


const sessionkeys = ['sessionstate','sessionuser','allTeams','allTeamsRTM','allUsers','activeTeam','activeTask','activeProfile']

export default function clearSession(){
    for(let key of sessionkeys){
        if(sessionStorage.getItem(key)){
            sessionStorage.removeItem(key);
        }
    }
}

export class SessionJanitor{

    static getSessionstate(){
        return sessionStorage.getItem('sessionstate')

    }
    static setSessionstate(mode){
        if(mode){
            sessionStorage.setItem('sessionstate','Admin')
        }else{
            sessionStorage.setItem('sessionstate','User')
        }
        
    }
    static clearSessionState(){
        sessionStorage.setItem('sessionstate',null)
    }

    static setSessionUser(obj,callback){     
        console.log(obj)  
        console.log(obj.id)
        makeRequest('/user/get/permissions','POST',getHeader(),JSON.stringify({'Userid':obj.id}),(data)=>{
            if(data.Status === 'Failed'){
                alert(data.Message);
            }
            else{  
                console.log(data)
                obj.permissions=JSON.parse(JSON.stringify(data.Permissions.map(x=>mapPermission(x.Permission))))
                console.log('permissions:'+obj.permissions)
                sessionStorage.setItem('sessionuser',JSON.stringify(obj))
                if(callback){
                    callback.apply();
                }
            }           
        },(req,err)=>{
            console.log(err);
        })  
    }
    static getSessionUser(){
        if(sessionStorage.getItem('sessionuser')){
            return JSON.parse(sessionStorage.getItem('sessionuser'))
        }else{
            return null;
        }
    }
    static setAllUsers(callback){
        makeRequest('/user/list','POST',getHeader(),JSON.stringify({}),(data)=>{
            if(data.Status === 'Failed'){
                alert(data.Message);
            }
            else{            
                sessionStorage.setItem('allUsers',JSON.stringify(data.Users.map(x=>mapUser(x['User']))))             
                if(callback){
                    callback.apply()
                }
            }           
        },(req,err)=>{
            console.log(err);
        })  
    }
    static getAllUsers(callback){
        if(callback){
            SessionJanitor.setAllUsers(callback);
        }
        
        
        return JSON.parse(sessionStorage.getItem('allUsers'))
    }
    static setAllTeams(callback){
        makeRequest('/team/list','POST',getHeader(),JSON.stringify({}),(data)=>{
            if(data.Status === 'Failed'){
                alert(data.Message);
            }
            else{
                let toList = data.Teams;
                sessionStorage.setItem('allTeams',JSON.stringify(JSON.parse(JSON.stringify(toList))));
                if(callback){
                    callback.apply();
                }
            }
            
        },()=>{alert('Server not found')});

    }
    static getAllTeams(callback){
        if(callback){
            SessionJanitor.setAllTeams(callback);
        }
        return JSON.parse(sessionStorage.getItem('allTeams'));
    }
    static setUserContacts(callback,userid){
        console.log('useridlel:' + userid)
        makeRequest('/user/get/contacts','POST',getHeader(),JSON.stringify({'Userid':userid}),(data)=>{
            if(data.Status === 'Failed'){
                alert(data.Message);
            }
            else{  
                let users = this.getAllUsers(null);
                users.forEach(element => {
                    if(element.id === userid){
                        
                        element.contacts=JSON.parse(JSON.stringify(data.Contacts.map(x=>mapContact(x.Contact))))
                        //console.log(element.contacts)
                    }
                });  
                sessionStorage.setItem('allUsers',JSON.stringify(users))             
                if(callback){
                    callback.apply()
                }
            }           
        },(req,err)=>{
            console.log(err);
        })  
    }
    static getUserContacts(callback,userid){
        //console.log('userid:' + userid)
        console.log(callback)
        if(callback){
            console.log("what?")
            SessionJanitor.setUserContacts(callback,userid);
        }    
        console.log(SessionJanitor.getAllUsers(null))
        let contacts = SessionJanitor.getAllUsers(null).find(x=>x.id == userid).contacts
        console.log("userid"+userid+"the contacts:"+contacts)
        return contacts.length>0?contacts:[]
    }
}


export function getHeader(){
   // console.log('getting header');
    return JSON.stringify({"username":sessionStorage.getItem('username'),"password":sessionStorage.getItem('password'),"hash":sessionStorage.getItem('hash')});
}



