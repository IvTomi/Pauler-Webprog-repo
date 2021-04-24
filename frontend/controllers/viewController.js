import createAdminNav from '../view/content/admin/admintop.js';
import {createLogin} from '../view/login.js';
import {createHashInputView} from '../view/login.js';
import createSignup from '../view/signup.js';
import createUserNav from '../view/content/user/usertop.js';
import setUpUserRecordViews from '../view/content/user/records/mainRecord.js';
import setUpUserTeamsView from '../view/content/user/teams/mainTeamU.js';
import setUpUserProfile from '../view/content/user/profile/profile.js';
import setUpAdminProfile from '../view/content/admin/profile/profile.js';
import setUpUserProjectsViews from '../view/content/user/projects/mainProject.js';
import setUpAdminTeamsView from '../view/content/admin/team/mainTeamA.js';
import setUpAdminProjectsView from '../view/content/admin/project/mainProject.js';
import setUpAdminSettingsView from '../view/content/admin/settings/mainSettings.js';


export default class ViewController{
    clearTag(tag){
        tag.innerHTML = "";
    }

    clearBody(){
        this.clearTag(document.body);
    }

    loadLogin(){
        this.clearBody();
        if(!sessionStorage.getItem('hash')){
            createHashInputView();
        }else{
            createLogin();
        }      
    }

    loadSignup(){
        this.clearBody();
        createSignup();
    }

    loadAdmin(){
        this.clearBody();
        createAdminNav();
    }

    loadAdminProfile(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpAdminProfile(main);
    }

    loadAdminProjects(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpAdminProjectsView(main);
    }

    loadAdminTeam(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpAdminTeamsView(main);
    }

    loadAdminSettings(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpAdminSettingsView(main);
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

    loadUserProject(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpUserProjectsViews(main);
    }

    loadUserTeam(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = new viewController().setUpMain();
        setUpUserTeamsView(main);
    }

    loadAdminTeam(n){
        //Ideiglenesen
        this.loadAdmin();
        const main = this.setUpMain();
        setUpAdminTeamsView(main,n);
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