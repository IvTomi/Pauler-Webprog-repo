import viewController from '../../../controllers/viewController.js';
import HTMLTag from '../../../utilities/HTMLTag.js';
import createAside from '../../listBuilders/asideBuilder.js';
import {getName} from '../../../controllers/usertopcontroller.js'
import {router} from '../../../index.js'
import {SessionJanitor} from '../../../utilities/sessionJanitor.js'

        
function createUserNav(){
        const nav = new HTMLTag('nav').addClass('adminNav').insertBefore(document.body);
        new HTMLTag('img').addAttr('src','./res/defaultUser.png').addAttr('alt','user képe').insertBefore(document.body);
        new HTMLTag('h1').setText(getName()).insertBefore(document.body).onclick(new viewController().loadUserProfile);
        const ul = new HTMLTag('ul').append(nav);
        new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/nav.css').append(document.body);

        new HTMLTag('li').setText('Rekordok').append(ul).onclick(()=>{router.navigate('recordUser')});
        new HTMLTag('li').setText('Projectek').append(ul).onclick(new viewController().loadUserProject);
        new HTMLTag('li').setText('Csapatok').append(ul).onclick(()=>{router.navigate('myTeamsUser')});
        new HTMLTag('li').setText('Kijelentkezés').append(ul).onclick(()=>{logout()});

        createAside('Munkatársak');
    }

    function logout(){
        SessionJanitor.clearSessionState();
        router.navigate('login')
    }

export default createUserNav;