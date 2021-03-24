import createAdminNav from '../view/content/admin/admintop.js';
import createLogin from '../view/login.js';
import createSignup from '../view/signup.js';
import createUserNav from '../view/content/user/usertop.js';
import setUpUserRecordViews from '../view/content/user/records/mainRecord.js';

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
        const main = new viewController().setUpMain();
        setUpUserRecordViews(main);
    }

    setUpMain(){
        let main = document.getElementsByTagName('main')[0];
        if(main){
            return main;
        }
        else{
            main = document.createElement('main');
            document.body.appendChild(main);
            return main;
        }
    } 
}

export default viewController;