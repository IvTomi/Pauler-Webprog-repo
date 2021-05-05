import HTMLTag from '../../utilities/HTMLTag.js';
import UserData from '../../datasets/userdata.js';
import {SessionJanitor} from '../../utilities/sessionJanitor.js'
import { viewController } from '../../index.js';
import {router} from '../../index.js'

function createAside(title){
    title = title.toString();
    const aside = new HTMLTag('aside').append(document.body);
    new HTMLTag('h3').setText(title).append(aside);
    const ul = new HTMLTag('ul').addClass('scroll').append(aside);
    SessionJanitor.getAllUsers(()=>{makeUserList(SessionJanitor.getAllUsers(null),ul)})
}

export function makeUserList(data,appendPoint){
    console.log(data)
    if(data){
        for(let dat of data){
            makeOneUser(dat,appendPoint)
        }
    }
    
}

function makeOneUser(object,appendPoint){
    let user = object || {};
    console.log(object.username)
    if(user.username){
        const li = new HTMLTag('li').append(appendPoint);
        if(user.img){
            new HTMLTag('img').addAttr('src',user.img).addAttr('alt','user képe').append(li).onclick(()=>{
                //viewController.loadUserProfile(0,user.id);
                console.log(SessionJanitor.getSessionstate())
                if(SessionJanitor.getSessionstate() === 'Admin'){
                    router.navigate('ProfileAdmin',user.id)
                }if(SessionJanitor.getSessionstate() === 'User'){
                    router.navigate('ProfileUser',user.id)
                }
                
            });
        }
        new HTMLTag('p').setText(user.firstname + ' '+user.lastname).append(li);
        if(user.roles){
            const cont = new HTMLTag('p').append(li);
            for(let role of user.roles){
                new HTMLTag('span').setText('#'+role).append(cont);
            }
        }
    }
}



export default createAside;