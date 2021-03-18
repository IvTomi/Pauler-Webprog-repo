import HTMLTag from '../../../utilities/HTMLTag.js';
import createAside from '../../listBuilders/asideBuilder.js';

        
function createUserNav(){
        new HTMLTag('img').addAttr('src','../../../res/defaultUser.png').addAttr('alt','user képe').append(document.body);
        new HTMLTag('h1').setText('Példa Mónika').append(document.body);
        const nav = new HTMLTag('nav').addClass('adminNav').append(document.body);
        const ul = new HTMLTag('ul').append(nav);
        new HTMLTag('li').setText('Rekordok').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Projectek').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Csapatok').append(ul)//.onclick(this.load);
        createAside('Munkatársak');
    }

export default createUserNav;