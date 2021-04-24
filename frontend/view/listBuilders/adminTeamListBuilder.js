import HTMLTag from '../../utilities/HTMLTag.js';
import {makeRequest} from '../../utilities/serviceHandler.js';
import {getHeader} from '../../controllers/logincontroller.js';
import { router } from '../../index.js';

/**data=teams */
 function createList(data,appendPoint){
    for(let team of data){
        const li = new HTMLTag('li');
        if(team.TeamName && team.Description && team.Id){
            new HTMLTag('p').setText(team.TeamName).append(li).onclick(()=>{sessionStorage.setItem('activeTeam',JSON.stringify(team)); router.navigate('teamInfoAdmin')});
            const projectList = new HTMLTag('ul').append(li);
            for(let task of team.TeamTasks){
                if(task.TaskName && task.Id){
                new HTMLTag('li').setText(task.TaskName).append(projectList).onclick(()=>{sessionStorage.setItem('activeTask',JSON.stringify(task)); console.log(sessionStorage.getItem('activeTask')) /*router.navigate('taskview')*/});
                }
            }
            const memP = new HTMLTag('ul');
            for(let member of team.TeamMembers){
                let person = member.User;
                if(person.FirstName && person.LastName && person.Id){
                    new HTMLTag('li').setText(person.LastName+' '+person.FirstName).append(memP).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(person)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
                }
            }
            memP.append(li);
            new HTMLTag('button').setText('X').append(li).onclick(()=>{makeRequest('/team/remove','POST',getHeader(),JSON.stringify({"teamid":team.Id}),(data)=>{onDeleteSucces(data)},()=>{onAjaxFail()})});
        }
        li.append(appendPoint);
    }
}

export function createAllTeamsList(appendPoint){
    if(sessionStorage.getItem('allTeams')){
        let min = new Date(Date.now()).getMinutes();
        let h = new Date(Date.now()).getHours();
        let savedMin = sessionStorage.getItem('allTeamsRTM') || null;
        let savedH = sessionStorage.getItem('allTeamsRTH') || null;
        if(savedMin && savedH){
            if(min===savedMin && h===savedH){
                data = sessionStorage.getItem('allTeams');
                createList(data,appendPoint);
            }
        }
    }
    makeRequest(/*'/team/list'*/'/test','GET',getHeader(),'{}',(data)=>{onGetTeamsSucces(data)},()=>onAjaxFail());


    
}

function onGetTeamsSucces(data){
    const appendPoint = document.getElementById('list');
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        let toList = data.List;
        toList = getDummyData();
        sessionStorage.setItem('allTeams',JSON.stringify(toList));
        sessionStorage.setItem('allTeamsRTM',new Date(Date.now()).getMinutes());
        sessionStorage.setItem('allTeamsRTH',new Date(Date.now()).getHours());
        createList(toList,appendPoint);
    }
    
}

function onAjaxFail(){
    alert('Server not found');
}

function onDeleteSucces(data){
    if(data.Status === /*'Failed'*/'rest'){
        alert(data.Message);
    }
    else{
        sessionStorage.removeItem('allTeams');
        router.navigate('teamsAdmin');
    }
}


export function getDummyData(){
    let data = [{
        Id: 1,
        TeamName: 'alfa csapat',
        Description: 'Az első és legtutibb csapat',
        TeamMembers:[
            {
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
            }
        ],
        TeamTasks:[
            {
                Id: 123,
                TaskName: 'Ekső feladat',
                TaskDescription: 'lorem ipsum dolor',
                TaskDeadLine: '2020-01-01',
                StatusName:'done'
            },
            {
                Id: 223,
                TaskName: 'Második feladat',
                TaskDescription: 'lorem ipsum dolor',
                TaskDeadLine: '2022-01-01',
                StatusName:'pending'
            }
        ]
    },
    {
        Id: 2,
        TeamName: 'béta brigád',
        Description: 'A kisegítő gárda',
        TeamMembers:[
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
            }
        ],
        TeamTasks:[
            {
                Id: 323,
                TaskName: 'Tartalék feladat',
                TaskDescription: 'lorem ipsum dolor',
                TaskDeadLine: '2020-01-01',
                StatusName:'done'
            },
        ]
    }]
    return data;
}



/*"Team":{

    "Id":0,
    
    "TeamName":"",
    
    "Description":"",
    
    "TeamMembers":[], //TeamMember
    
    "TeamTasks":[] //Task
    
    },

    "TeamMember":{

    "User":{}, //User

    "Tag":""

    }

    "User":{

    "Id":0,

    "Username":"",

    "FirstName":"",

    "LastName":"",

    "Contacts":[], //Contact

    "Tasks":[], //Task

    "Permissions":[] //Permission

    },


    "Task":{

    "Id":0,

    "TaskName":"",

    "TaskDescription":"",

    "TaskDeadLine":"",

    "StatusName":""

},


*/ 