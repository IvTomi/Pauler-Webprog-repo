import HTMLTag from "../../utilities/HTMLTag.js";
import RecordData from "../../datasets/userProfileData.js";
import {allUsers,CreateContact,removeContact} from '../../controllers/userProfileController.js';
import {SessionJanitor} from '../../utilities/sessionJanitor.js'

export function createProfileDataList(userid){
    //ehelyett lekérés a users-ből
    console.log(SessionJanitor.getSessionUser().id)
    //ez sem kell majd, ha meglesz az endpoint
    SessionJanitor.getAllUsers(()=>{HTMLview(SessionJanitor.getAllUsers(null),userid?userid:SessionJanitor.getSessionUser().id)})
    
}

export function HTMLview(users,userid){
    const appendPoint = document.getElementById('content');   
    appendPoint.innerHTML = ""
    let firstName = ""
    let lastName = "";
    let contacts = [];
    let selectedUser;

    users.forEach(element => {
        if(element.id == userid){
            selectedUser = element;           
        }
    });

    firstName=selectedUser.firstname
    lastName = selectedUser.lastname
            

    console.log('Profile'+ SessionJanitor.getActiveProfile())

    console.log('user'+ users)  
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/contentbox.css').append(document.body);
    new HTMLTag('h1').setText(firstName + ' ' + lastName).append(appendPoint);
    let canedit = false
    if((SessionJanitor.getSessionUser().permissions.find(x=>x.isenabled && x.permissionname === 'CanEditUser')) || userid == SessionJanitor.getSessionUser().id){
        canedit = true;
    }
    if(canedit){
        let appendbox = new HTMLTag('div').addAttr('class','appendBox').append(appendPoint)
        new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/userprofile.css').append(document.body);
        new HTMLTag('p').setText('Adat hozzáadása').append(appendbox);
    const add = new HTMLTag('div').addAttr('id','contactadd').append(appendbox);
    let type = new HTMLTag('input').addAttr('id','contacttype').addAttr('name','type').addAttr('placeholder','Tipus').append(add);
    let value = new HTMLTag('input').addAttr('id','contactvalue').addAttr('name','value').addAttr('placeholder','Érték').append(add);
    let comment = new HTMLTag('input').addAttr('id','contactcomment').addAttr('name','value').addAttr('placeholder','Megjegyzés').append(add);
    const button = new HTMLTag('button').addAttr('class','contactaddbutton').setText('Hozzáadás').append(add).onclick(()=>{CreateContact(userid)}).preventDefaultEvent('click');
    }

    new HTMLTag('label').setText('Adatok').append(appendPoint);
    let userdata = new HTMLTag('div').addAttr('class','userData').append(appendPoint)
   

    SessionJanitor.getUserContacts(()=>{getContacts(userdata,SessionJanitor.getUserContacts(null,userid),canedit,userid)},userid)
       
}

function getContacts(appendPoint,contacts,canedit,userid){
    for(let contanct of contacts){
        console.log('a' + contacts.typename)
        let box = new HTMLTag('div').addAttr("class","contactbox").append(appendPoint);

        //if(van jogosultsága)
        if(canedit){
            new HTMLTag('button').setText("X").append(box).onclick(()=>{removeContact(userid,contanct.id)}).preventDefaultEvent('click');

        }

        new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/contact.css').append(document.body);

        new HTMLTag('p2').setText('Típus').append(box);
        new HTMLTag('p').setText(contanct.typename).append(box);
        new HTMLTag('p2').setText('Érték').append(box);
        new HTMLTag('p').setText(contanct.value).append(box);
        new HTMLTag('p2').setText('Megjegyzés').append(box);
        new HTMLTag('p').setText(contanct.description).append(box);
    }
}

    

function setUpListField(appendPoint){
    let list = document.getElementById('list');
        if(list){
            new viewController().clearTag(list);
            return list;
        }
        else{
            list = document.createElement('ul');
            list.setAttribute('id','list');
            appendPoint.appendChild(list);
            return list;
        }
}