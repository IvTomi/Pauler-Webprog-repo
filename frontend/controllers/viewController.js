import createAdminNav from '../view/content/admin/admintop.js';
import createLogin from '../view/login.js';
import createSignup from '../view/signup.js';
import createUserNav from '../view/content/user/usertop.js';
import setUpUserRecordViews from '../view/content/user/records/mainRecord.js';
import setUpUserTeamsView from '../view/content/user/teams/mainTeamU.js';
import setUpUserProfile from '../view/content/user/profile/profile.js';
import setUpAdminProfile from '../view/content/admin/profile/profile.js';

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
    loadAdminProfile(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpAdminProfile(main);
    }


    loadUser(evt){
        if(evt){
            evt.preventDefault();
        }
        new viewController().clearBody();
        createUserNav();
        new viewController().loadUserRecord();
    }

    loadUserRecord(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpUserRecordViews(main);
    }

    loadUserProfile(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpUserProfile(main);
    }

    loadUserTeam(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpUserTeamsView(main);
    }

    setUpMain(){
        let main = document.getElementsByTagName('main')[0];
        if(main){
            main.innerHTML = '';
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