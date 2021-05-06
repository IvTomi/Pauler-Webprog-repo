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
import {viewController} from '../index.js'

export default class ViewController{
    clearTag(tag){
        tag.innerHTML = "";
    }

    clearBody(){
        viewController.clearTag(document.body);
    }

    loadLogin(){
        viewController.clearBody();
        if(!sessionStorage.getItem('hash')){
            createHashInputView();
        }else{
            createLogin();
        }      
    }

    loadSignup(){
        viewController.clearBody();
        createSignup();
    }

    loadAdmin(){
        viewController.clearBody();
        createAdminNav();
    }

    loadAdminProfile(evt){
        if(evt){
            evt.preventDefault();
        }
        viewController.loadAdmin();
        const main = viewController.setUpMain();
        setUpAdminProfile(main);
    }

    loadAdminProjects(n){
        viewController.loadAdmin()
        const main = viewController.setUpMain();
        setUpAdminProjectsView(main,n);
    }

    
    loadAdminSettings(n){
        viewController.loadAdmin();
        const main = viewController.setUpMain();
        setUpAdminSettingsView(main,n);
    }
    

    loadUser(username){
        viewController.clearBody();
        createUserNav(username?username:null);
    }

    loadUserRecord(evt){
        if(evt){
            evt.preventDefault();
        }
        const main = viewController.setUpMain();
        setUpUserRecordViews(main);
    }

    loadUserProfile(n,id){
        
        if(n === 0){
            viewController.loadUser(id);
        }
        if(n === 1){
            viewController.loadAdmin();
        }
        const main = viewController.setUpMain();
        setUpUserProfile(main,id);
    }

    loadUserProject(n){
        viewController.loadUser();
        const main = viewController.setUpMain();
        setUpUserProjectsViews(main,n);
    }

    loadUserTeam(n){
        viewController.loadUser();
        const main = viewController.setUpMain();
        setUpUserTeamsView(main,n);
    }

    loadAdminTeam(n){
       
        viewController.loadAdmin();
        const main = viewController.setUpMain();
        setUpAdminTeamsView(main,n);
    }

    loadRecordAdmin(){

    }

    loadRecordUser(){
        this.setupRecordView();
    }

    setupRecordView(){
        viewController.loadUser();
        const main = viewController.setUpMain();
        setUpUserRecordViews(main);
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