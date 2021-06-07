import ViewController from "./controllers/viewController.js";
import Router from "./utilities/router.js";



export const router = new Router({root:"/",mode:"history"});
export const viewController = new ViewController();



router.add("login", ()=>{viewController.loadLogin()});
router.add("register",()=>{viewController.loadSignup()});

router.add("manageSettingsAdmin",()=>{viewController.loadAdminSettings(0)});
router.add("newSettingsAdmin",()=>{viewController.loadAdminSettings(1)});

router.add("teamsAdmin",()=>{viewController.loadAdminTeam(0)});
router.add("newTeamAdmin",()=>{viewController.loadAdminTeam(1)});
router.add('teamInfoAdmin',()=>{viewController.loadAdminTeam(2)});

router.add('ProfileUser',(p)=>{viewController.loadUserProfile(0,p)});
router.add('ProfileAdmin',(p)=>{viewController.loadUserProfile(1,p)});

router.add("myProjectsUser",()=>{viewController.loadUserProject(0)});
router.add("oneProjectUser",()=>{viewController.loadUserProject(1)});

router.add("createRecordUser",()=>{viewController.loadUserRecord(2)});
router.add("myRecordsUser",()=>{viewController.loadUserRecord(0)});
router.add("oneRecordUser",()=>{viewController.loadUserRecord(1)});

router.add("myTeamsUser",()=>{viewController.loadUserTeam(0)});
router.add("oneTeamUser",()=>{viewController.loadUserTeam(1)});


router.add("recordUser",()=>{viewController.loadRecordUser()});

router.add('newtaskAdmin',()=>{viewController.loadAdminProjects(0)});
router.add('alltaskAdmin',()=>{viewController.loadAdminProjects(1)});
router.add('onetaskAdmin',()=>{viewController.loadAdminProjects(2)});


console.log();
window.onload = ()=>{router.navigate(router.clearSlashes(router.replaceRoot(window.location.pathname)))};
//router.navigate('login');

