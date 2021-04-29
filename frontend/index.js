import ViewController from "./controllers/viewController.js";
import Router from "./utilities/router.js";

export const router = new Router({root:"/frontend/",mode:"history"});
export const viewController = new ViewController();



router.add("login", ()=>{viewController.loadLogin()});
router.add("register",()=>{viewController.loadSignup()});

router.add("profileAdmin",()=>{viewController.loadAdminProfile()});

router.add("manageSettingsAdmin",()=>{viewController.loadAdminSettings(0)});
router.add("newSettingsAdmin",()=>{viewController.loadAdminSettings(1)});

router.add("teamsAdmin",()=>{viewController.loadAdminTeam(0)});
router.add("newTeamAdmin",()=>{viewController.loadAdminTeam(1)});
router.add('teamInfoAdmin',()=>{viewController.loadAdminTeam(2)})

router.add('userProfile',()=>{viewController.loadUserProfile()})


console.log();
window.onload = ()=>{router.navigate(router.clearSlashes(router.replaceRoot(window.location.pathname)))};
router.navigate('manageSettingsAdmin');

