import ViewController from "./controllers/viewController.js";
import Router from "./utilities/router.js";

export const router = new Router({root:"/",mode:"history"});
export const viewController = new ViewController();

router.add("login", ()=>{viewController.loadLogin()});
router.add("register",()=>{viewController.loadSignup()});
//router.navigate('login');
console.log();
window.onload = ()=>{router.navigate(router.clearSlashes(router.replaceRoot(window.location.pathname)))};


