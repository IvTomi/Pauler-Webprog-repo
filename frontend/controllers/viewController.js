import createAdminNav from '../view/content/admin/admintop.js';
import createLogin from '../view/login.js';
import createSignup from '../view/signup.js';
import createUserNav from '../view/content/user/usertop.js';

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

    loadSignup(evt){
        if(evt){
            evt.preventDefault();
        }
        new viewController().clearBody();
        createSignup();
    }

    loadAdmin(evt){
        if(evt){
            evt.preventDefault();
        }
        new viewController().clearBody();
        createAdminNav();
    }

    loadUser(evt){
        if(evt){
            evt.preventDefault();
        }
        new viewController().clearBody();
        createUserNav();
    }
}

export default viewController;