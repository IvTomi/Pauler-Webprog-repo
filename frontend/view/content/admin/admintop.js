import viewController from '../../../controllers/viewController.js';
import HTMLTag from '../../../utilities/HTMLTag.js';
import createAside from '../../listBuilders/asideBuilder.js';

        
function createAdminNav(){
        new HTMLTag('h1').setText('Cég neve').append(document.body).onclick(new viewController().loadAdminProfile);
        const nav = new HTMLTag('nav').addClass('adminNav').append(document.body);
        const ul = new HTMLTag('ul').append(nav);
        new HTMLTag('li').setText('Riportok').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Projectek').append(ul).onclick(new viewController().loadAdminProjects);
        new HTMLTag('li').setText('Csapatok').append(ul).onclick(new viewController().loadAdminTeam);
        new HTMLTag('li').setText('Jogosultságok').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Beállítások').append(ul)//.onclick(this.load);
        createAside('Alkalmazottak');
    }

export default createAdminNav;