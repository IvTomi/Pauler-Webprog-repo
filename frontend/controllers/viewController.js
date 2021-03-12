import createAdminTop from '../view/content/admin/admintop.js';
import createLogin from '../view/login.js';

class viewController{
    clearTag(tag){
        tag.innerHTML = "";
    }
    clearBody(){
        this.clearTag(document.body);
    }
    loadLogin(evt){
        if(evt){
            evt.preventDefault();
        }
        new viewController().clearBody();
        createLogin();
    }
    loadAdminTop(evt){
        if(evt){
            evt.preventDefault();
        }
        new viewController().clearBody();
        createAdminTop();
    }
}

export default viewController;