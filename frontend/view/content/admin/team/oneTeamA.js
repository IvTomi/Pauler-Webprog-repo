import HTMLTag from '../../../../utilities/HTMLTag.js';
import viewController from '../../../../controllers/viewController.js';
import { refreshContent } from './mainTeamA.js';
import { createNonTeamMemberList, createTeamMembersList,  onDeleteClicked} from '../../../../controllers/adminSelectedTeamcontroller.js';
import { createTeamProjectsList } from '../../../listBuilders/adminTeamListBuilder.js';
import { SessionJanitor } from '../../../../utilities/sessionJanitor.js';



function createTeamInfoView(team){
    
    if(!(team.teamname && team.description && team.teammembers && team.teamtasks)){//A szükséges információk meglétének ellenőrzése
        return false;
    }
    const content = refreshContent(-1);
    new viewController().clearTag(content);
    new HTMLTag('h2').setText(team.teamname).append(content);
    new HTMLTag('p').setText(team.description).append(content);
    new HTMLTag('p').setText('Tagok').append(content);
    const memList = new HTMLTag('ul').addAttr('id','members').append(content);
    memList.node.style.background='red';
    createTeamMembersList(team,memList);
    const nonMemList = new HTMLTag('ul').addAttr('id','nonmembers').append(content);
    //get list of all users
    let users = SessionJanitor.getAllUsers(()=>{SessionJanitor.getAllUsers(null)});
   
    /*let users = [{
        User:{
            Id:11,
            Username: 'nagypeti',
            FirstName: 'Péter',
            LastName: 'Nagy'
        },
        Tag:'#captain'
    },
    {
        User:{
            Id:12,
            Username: 'kisspetra',
            FirstName: 'Petra',
            LastName: 'Kiss'
        },
        Tag:'#design'
    },
    {
        User:{
            Id:13,
            Username: 'feszes',
            FirstName: 'Gábor',
            LastName: 'Feszes'
        },
        Tag:'#muscle'
    },
    {
        User:{
            Id:18,
            Username: 'dragonqueen',
            FirstName: 'Anna',
            LastName: 'Szabó'
        },
        Tag:'#weight'
    },
    {
        User:{
            Id:20,
            Username: 'boss',
            FirstName: 'György',
            LastName: 'Baila'
        },
        Tag:'#boss'
    }];*/
    createNonTeamMemberList(users,team,nonMemList)
    new HTMLTag('p').setText('Projektek').append(content);
    const projList = new HTMLTag('ul').addClass('projects').append(content); 
    createTeamProjectsList(team,projList);
    new HTMLTag('button').setText('Csapat törlése').append(content).onclick(()=>{onDeleteClicked(team)});
}



export default createTeamInfoView;