import viewController from '../../../controllers/viewController.js';
import HTMLTag from '../../../utilities/HTMLTag.js';
import createAside from '../../listBuilders/asideBuilder.js';
import {router} from '../../../index.js'
import {SessionJanitor} from '../../../utilities/sessionJanitor.js'

        
function createAdminNav(){
        new HTMLTag('h1').setText('Cég neve').append(document.body).onclick(new viewController().loadAdminProfile);
        const nav = new HTMLTag('nav').addClass('adminNav').append(document.body);
        const ul = new HTMLTag('ul').append(nav);
        new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/nav.css').append(document.body);
        new HTMLTag('li').setText('Riportok').append(ul) //.onclick(this.load);
        new HTMLTag('li').setText('Projectek').append(ul).onclick(()=>{router.navigate('newSettingsAdmin')});
        new HTMLTag('li').setText('Csapatok').append(ul).onclick(()=>{router.navigate('newSettingsAdmin')});
        new HTMLTag('li').setText('Beállítások').append(ul).onclick(()=>{router.navigate('newSettingsAdmin')});
        new HTMLTag('li').setText('Kijelentkezés').append(ul).onclick(()=>{logout()});
        createAside('Alkalmazottak');
    }


    function logout(){
        SessionJanitor.clearSessionState();
        router.navigate('login')
    }
export default createAdminNav;