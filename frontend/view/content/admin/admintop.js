import viewController from "../../../controllers/viewController.js";
import HTMLTag from '../../../utilities/HTMLTag.js';

        
function createAdminTop(){
        const div = new HTMLTag('div').append(document.body);
        new HTMLTag('button').setText('Lorem ipsum').append(div).onclick( new viewController().loadLogin);
        new HTMLTag('h1').setText('Cég neve').append(document.body);
        const nav = new HTMLTag('nav').addClass('adminNav').append(document.body);
        const ul = new HTMLTag('ul').append(nav);
        new HTMLTag('li').setText('Riportok').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Projectek').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Csapatok').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Jogosultságok').append(ul)//.onclick(this.load);
        new HTMLTag('li').setText('Beállítások').append(ul)//.onclick(this.load);
    }

export default createAdminTop;