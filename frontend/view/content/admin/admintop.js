import viewController from '../../../controllers/viewController.js';
import HTMLTag from '../../../utilities/HTMLTag.js';
import createAside from '../../listBuilders/asideBuilder.js';
import {router} from '../../../index.js'
import {SessionJanitor} from '../../../utilities/sessionJanitor.js'

        
function createAdminNav(){
        let mainContent = document.getElementById("MainContent");
        const nav = new HTMLTag('nav').addClass('adminNav').insertBefore(document.body);
        console.log(nav)
        const ul = new HTMLTag('ul').append(nav);

        new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/nav.css').insertBefore(document.body);
        new HTMLTag('h1').setText('Cég neve').insertBefore(document.body).onclick(new viewController().loadAdminProfile);
        new HTMLTag('li').setText('Projectek').append(ul).onclick(()=>{router.navigate('alltaskAdmin')});
        new HTMLTag('li').setText('Csapatok').append(ul).onclick(()=>{router.navigate('teamsAdmin')});
        new HTMLTag('li').setText('Beállítások').append(ul).onclick(()=>{router.navigate('manageSettingsAdmin')});

        new HTMLTag('li').setText('Kijelentkezés').append(ul).onclick(()=>{logout()});
        createAside('Alkalmazottak');
    }


    function logout(){
        SessionJanitor.clearSessionState();
        router.navigate('login')
    }
export default createAdminNav;