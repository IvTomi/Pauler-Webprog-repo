import HTMLTag from '../../utilities/HTMLTag.js';
import UserData from '../../datasets/userdata.js';

function createAside(title){
    title = title.toString();
    const aside = new HTMLTag('aside').append(document.body);
    new HTMLTag('h3').setText(title).append(aside);
    const ul = new HTMLTag('ul').addClass('scroll').append(aside);
    makeUserList(new UserData().testData,ul);
}

function makeUserList(data,appendPoint){
    for(let datum of data){
        makeOneUser(datum,appendPoint)
    }
}

function makeOneUser(object,appendPoint){
    const user = object || {};
    if(user.name){
        const li = new HTMLTag('li').append(appendPoint);
        if(user.img){
            new HTMLTag('img').addAttr('src',user.img).addAttr('alt','user képe').append(li);
        }
        new HTMLTag('p').setText(user.name).append(li);
        if(user.tasks){
            const cont = new HTMLTag('p').append(li);
            for(let task of user.tasks){
                new HTMLTag('span').setText('#'+task).append(cont);
            }
        }
    }
}



export default createAside;