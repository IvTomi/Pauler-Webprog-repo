import HTMLTag from '../../utilities/HTMLTag.js';
import {onTeamClicked,onTaskClicked,onUserClicked,onDeleteClicked} from '../../controllers/adminAllTeamscontroller.js';
import {ChangeTag, onFireClick,onHireClick} from '../../controllers/adminSelectedTeamcontroller.js';
import {onSuccesfulFire, onSuccesfulHire} from '../../controllers/adminNewTeamController.js';


/**data=teams */
export default function createList(data,appendPoint){
    for(let team of data){
        const li = new HTMLTag('li');
        team = team.Team;
        if(team.teamname  && team.id){
            new HTMLTag('p').setText(team.teamname).append(li).onclick(()=>onTeamClicked(team));
            const projectList = new HTMLTag('ul').append(li);
            for(let task of team.teamtasks){
                if(task.TaskName && task.id){
                new HTMLTag('li').setText(task.TaskName).append(projectList).onclick(()=>onTaskClicked(task));
                }
            }
            const memP = new HTMLTag('ul');
            for(let member of team.teammembers){
                let person = member.User;
                if(person.firstname && person.lastname && person.id){
                    new HTMLTag('li').setText(person.lastname+' '+person.firstname).append(memP).onclick(()=>onUserClicked(person));
                }
            }
            memP.append(li);
            new HTMLTag('button').setText('X').append(li).onclick(()=>onDeleteClicked(team));
        }
        li.append(appendPoint);
    }
}

export function addNewMemberToExisting(user,appendPoint,team,tag){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{onHireClick(team,user)});
        new HTMLTag('p').setText(tag).addAttr('id','user-info-tag'+user.id).append(li);
        new HTMLTag('input').addAttr('type','text').addAttr('id','user-info-newtag'+user.id).append(li);
        new HTMLTag('button').setText('Tag frissít').append(li).onclick(()=>ChangeTag(user.id,team.id));
    }
    li.append(appendPoint);
}

export function addNonMemberToExisting(user,appendPoint,team){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{onFireClick(team,user)});
    }
    li.append(appendPoint);
}

export function createTeamProjectsList(tasks,appendpoint){
    appendpoint=document.getElementById('projectsList');
    for(let task of tasks){
        task = task.Task;
        const li = new HTMLTag('li').setText(task.taskname).append(appendpoint).onclick(()=>onTaskClicked(task));
        
    }
}

export function addNewMemberToNew(user,appendPoint){
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id).addAttr('data-id',user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{onSuccesfulFire(user)});
        new HTMLTag('input').addAttr('type','text').addAttr('id','user-info-newtag'+user.id).addAttr('placeholder','Tag').append(li);
    }
    li.append(appendPoint);
}

export function addNonMemberToNew(user,appendPoint){
    console.log(user);
    appendPoint = document.getElementById('nonmembers');
    const li = new HTMLTag('li').addAttr('id','user-info'+user.id);
    if(user.firstname && user.lastname && user.id){
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{onSuccesfulHire(user)});
    }
    li.append(appendPoint);
}

export function getDummyData(){
    let data = [{
        id: 1,
        teamname: 'alfa csapat',
        description: 'Az első és legtutibb csapat',
        teammembers:[
            {
                User:{
                    id:11,
                    Username: 'nagypeti',
                    firstname: 'Péter',
                    lastname: 'Nagy'
                },
                Tag:'#captain'
            },
            {
                User:{
                    id:12,
                    Username: 'kisspetra',
                    firstname: 'Petra',
                    lastname: 'Kiss'
                },
                Tag:'#design'
            }
        ],
        teamtasks:[
            {
                id: 123,
                TaskName: 'Ekső feladat',
                TaskDescription: 'lorem ipsum dolor',
                TaskDeadLine: '2020-01-01',
                StatusName:'done'
            },
            {
                id: 223,
                TaskName: 'Második feladat',
                TaskDescription: 'lorem ipsum dolor',
                TaskDeadLine: '2022-01-01',
                StatusName:'pending'
            }
        ]
    },
    {
        id: 2,
        teamname: 'béta brigád',
        description: 'A kisegítő gárda',
        teammembers:[
            {
                User:{
                    id:13,
                    Username: 'feszes',
                    firstname: 'Gábor',
                    lastname: 'Feszes'
                },
                Tag:'#muscle'
            },
            {
                User:{
                    id:18,
                    Username: 'dragonqueen',
                    firstname: 'Anna',
                    lastname: 'Szabó'
                },
                Tag:'#weight'
            },
            {
                User:{
                    id:20,
                    Username: 'boss',
                    firstname: 'György',
                    lastname: 'Baila'
                },
                Tag:'#boss'
            }
        ],
        teamtasks:[
            {
                id: 323,
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

    "id":0,
    
    "teamname":"",
    
    "description":"",
    
    "teammembers":[], //TeamMember
    
    "teamtasks":[] //Task
    
    },

    "TeamMember":{

    "User":{}, //User

    "Tag":""

    }

    "User":{

    "id":0,

    "Username":"",

    "firstname":"",

    "lastname":"",

    "Contacts":[], //Contact

    "Tasks":[], //Task

    "Permissions":[] //Permission

    },


    "Task":{

    "id":0,

    "TaskName":"",

    "TaskDescription":"",

    "TaskDeadLine":"",

    "StatusName":""

},


*/ 