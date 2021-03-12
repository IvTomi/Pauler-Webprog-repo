import createAdminTop from '../view/content/admin/admintop.js';
import createLogin from '../view/login.js';

class viewControl{
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
        new viewControl().clearBody();
        createLogin();
    }
    loadAdminTop(evt){
        if(evt){
            evt.preventDefault();
        }
        new viewControl().clearBody();
        createAdminTop();
    }
}

export default viewControl;