import HTMLTag from '../../../../utilities/HTMLTag.js';
import viewController from '../../../../controllers/viewController.js';
import { refreshContent } from './mainTeamA.js';
import { createNonTeamMemberList, createTeamMembersList,  onDeleteClicked, getTeamTasks} from '../../../../controllers/adminSelectedTeamcontroller.js';
import { createTeamProjectsList } from '../../../listBuilders/adminTeamListBuilder.js';
import { SessionJanitor } from '../../../../utilities/sessionJanitor.js';



function createTeamInfoView(team){
    
    console.log(JSON.stringify(team))
    if(team.teamname === null ||team.description ===null || team.teammembers ===null || team.teamtasks ===null){//A szükséges információk meglétének ellenőrzése
        console.log('rossz')
        return false;
    }
    const content = refreshContent(-1);
    new HTMLTag('h2').setText(team.teamname).append(content);
    new HTMLTag('p').setText(team.description).append(content);
    let memberDiv = new HTMLTag('div').addAttr('class','memberDiv').append(content);   
    let memberCont = new HTMLTag('div').addAttr('class','memberCont').append(memberDiv);
    let nonmemberCont = new HTMLTag('div').addAttr('class','nonmemberCont').append(memberDiv);
    new HTMLTag('h2').setText('Csapattagok').insertBefore(memberCont)
    new HTMLTag('h2').setText('Alkalmazott hozzáadása').insertBefore(nonmemberCont)
    new HTMLTag('link').addAttr('rel','stylesheet').addAttr('href','./css/teamcreate.css').append(document.body);
    //new viewController().clearTag(content);
   
    const memList = new HTMLTag('ul').addAttr('id','members').append(memberCont);
    createTeamMembersList(team,memList);
    const nonMemList = new HTMLTag('ul').addAttr('id','nonmembers').append(nonmemberCont);
    //get list of all users
    let users = SessionJanitor.getAllUsers(()=>{SessionJanitor.getAllUsers(null)});
   
    createNonTeamMemberList(users,team,nonMemList)
    new HTMLTag('h2').setText('Projektek').append(content);
    const projList = new HTMLTag('ul').addAttr('id','projectsList').append(content); 
    getTeamTasks(team.id);
    //createTeamProjectsList(team,projList);
    new HTMLTag('button').setText('Csapat törlése').addAttr('class','deleteTeamBtn').append(content).onclick(()=>{onDeleteClicked(team)});
}



export default createTeamInfoView;