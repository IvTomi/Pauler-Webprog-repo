import HTMLTag from '../../../../utilities/HTMLTag.js';
import {refreshContent,setUpListField} from './mainProject.js';

function makeNewProjectView(){
    const content = refreshContent(0);
    new HTMLTag('input').addAttr('placeholder','Project neve').append(content);
    new HTMLTag('textarea').addAttr('placeholder','leírás').append(content);
    new HTMLTag('p').setText('Project vége').append(content);
    new HTMLTag('input').addAttr('type','date').append(content);
    new HTMLTag('p').setText('Alkalmazottak és csapatok hozzáadása').append(content);

    //ide jön az alkalmazottak és a csapatok lekérése

    new HTMLTag('button').setText('Létrehozás').append(content);
}

export default makeNewProjectView;