import HTMLTag from '../../utilities/HTMLTag.js';
import {onTeamClicked,onTaskClicked,onUserClicked,onDeleteClicked} from '../../controllers/adminAllTeamscontroller.js';
import {onFireClick,onHireClick} from '../../controllers/adminSelectedTeamcontroller.js';


/**data=teams */
export default function createList(data,appendPoint){
    for(let team of data){
        const li = new HTMLTag('li');
        if(team.TeamName && team.Description && team.Id){
            new HTMLTag('p').setText(team.TeamName).append(li).onclick(()=>onTeamClicked(team));
            const projectList = new HTMLTag('ul').append(li);
            for(let task of team.TeamTasks){
                if(task.TaskName && task.Id){
                new HTMLTag('li').setText(task.TaskName).append(projectList).onclick(()=>onTaskClicked(task));
                }
            }
            const memP = new HTMLTag('ul');
            for(let member of team.TeamMembers){
                let person = member.User;
                if(person.FirstName && person.LastName && person.Id){
                    new HTMLTag('li').setText(person.LastName+' '+person.FirstName).append(memP).onclick(()=>onUserClicked(person));
                }
            }
            memP.append(li);
            new HTMLTag('button').setText('X').append(li).onclick(()=>onDeleteClicked(team));
        }
        li.append(appendPoint);
    }
}

export function addNewMemberToExisting(user,appendPoint,team){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.Id);
    if(user.FirstName && user.LastName && user.Id){
        new HTMLTag('p').setText(user.LastName+' '+user.FirstName).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Töröl').append(li).onclick(()=>{onHireClick(team,user)});
    }
    li.append(appendPoint);
}

export function addNonMemberToExisting(user,appendPoint,team){
    if(!team){
        team = JSON.parse(sessionStorage.getItem('activeTeam'));
    }
    const li = new HTMLTag('li').addAttr('id','user-info'+user.Id);
    if(user.FirstName && user.LastName && user.Id){
        new HTMLTag('p').setText(user.LastName+' '+user.FirstName).append(li).onclick(()=>{sessionStorage.setItem('activeProfile',JSON.stringify(user)); console.log(sessionStorage.getItem('activeProfile')) /*router.navigate('memberprofile')*/});
        new HTMLTag('button').setText('Hozzáad').append(li).onclick(()=>{onFireClick(team,user)});
    }
    li.append(appendPoint);
}

export function createTeamProjectsList(team,appendpoint){
    for(let task of team.TeamTasks){
        const li = new HTMLTag('li').setText(task.TaskName).append(appendpoint).onclick(()=>onTaskClicked(task));
        
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