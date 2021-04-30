import HTMLTag from "../../utilities/HTMLTag.js";
import RecordData from "../../datasets/userProfileData.js";
import {allUsers,CreateContact,getContacts,removeContact} from '../../controllers/userProfileController.js';


export function createProfileDataList(userid,appendPoint){
    //ehelyett lekérés a users-ből
    const users = [
        {Id:0,FirstName:'Minta',LastName:'Máté',Contacts:[
            {
                Id: 0,
                TypeName: 'email',
                Value: 'vasadsa@asds.hu'
            },
            {
                Id: 1,
                TypeName: 'telefon',
                Value: '30020443'
            }

        ]},
        {Id:1,FirstName:'Minta',LastName:'Mónika',Contacts:[
            {
                Id: 0,
                TypeName: 'email',
                Value: 'moni@asds.hu'
            },
            {
                Id: 1,
                TypeName: 'telefon',
                Value: '55555555'
            }

        ]},
        {Id:2,FirstName:'Minta',LastName:'Péter',Contacts:[
            {
                Id: 0,
                TypeName: 'email',
                Value: 'peti@asds.hu'
            },
            {
                Id: 1,
                TypeName: 'telefon',
                Value: '77777777'
            }

        ]}
    ];

    let firstName = "";
    let lastName = "";
    let contacts = [];


    for(let user of users){
        if(userid === user.Id && user.FirstName && user.LastName && user.Contacts){
            firstName = user.FirstName;
            lastName = user.LastName;
            contacts = user.Contacts;
        }
    }
    

    const content = new HTMLTag('div').addAttr('id','content').append(appendPoint);
    const img = new HTMLTag('img').addAttr('src','./res/defaultUser.png').addAttr('alt','user képe').append(appendPoint);
    new HTMLTag('h1').setText(firstName + ' ' + lastName).append(appendPoint);

    /*getContacts(userid);
    Ez alapértelmezetten visszaadná a userhez tartozó contactokat*/
    for(let contanct of contacts){
        //if(van jogosultsága)
        new HTMLTag('button').setText("X").append(appendPoint).onclick(()=>{removeContact(userid,contanct.Id)}).preventDefaultEvent('click');
        
        new HTMLTag('p').setText(contanct.TypeName).append(appendPoint);
        new HTMLTag('p').setText(contanct.Value).append(appendPoint);
    }

    //if(van jogosultdága)
    new HTMLTag('p').setText('Adat hozzáadása').append(appendPoint);
    const add = new HTMLTag('div').addAttr('id','add').append(appendPoint);
    let type = new HTMLTag('input').addAttr('id','type').addAttr('name','type').addAttr('placeholder','Tipus').append(add);
    let value = new HTMLTag('input').addAttr('id','value').addAttr('name','value').addAttr('placeholder','Érték').append(add);
    const button = new HTMLTag('button').setText('Hozzáadás').append(add).onclick(()=>{CreateContact(userid)}).preventDefaultEvent('click');
    


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