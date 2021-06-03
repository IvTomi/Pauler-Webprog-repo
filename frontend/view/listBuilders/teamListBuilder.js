
import { router } from '../../index.js';
import HTMLTag from '../../utilities/HTMLTag.js';
import { SessionJanitor } from '../../utilities/sessionJanitor.js';
import createUsersTeamInfoView from '../content/user/teams/oneTeamU.js';


export function createMyTeamsList(appendPoint,options){
    let data = SessionJanitor.getAllTeams(null);
    console.log(data);
    for(let Team of data){
        const li = new HTMLTag('li');
        if(Team.Team.teamname && Team.Team.description && Team.Team.id){
            li.onclick(() => {sessionStorage.setItem('activeTeam',Team);router.navigate('oneTeamUser') });
            new HTMLTag('p').setText(Team.Team.teamname).append(li);
            new HTMLTag('p').setText(Team.Team.description).append(li);
            
        }
        li.append(appendPoint);
    }
   
}


export function createTeamMembersList(data,appendPoint,options){
    
    for(let user of data){
        if(user.name){
            const li = new HTMLTag('li');
            if(options.admin){
                new HTMLTag('input').addAttr('id','userRadio-'+user.id).addAttr('name','userRadio-'+user.id).addAttr('type','radio').append(li);
            }
            new HTMLTag('p').setText(user.name).append(li);
            if(user.roles){
                const roles = new HTMLTag('p').append(li);
                for(let role of user.roles){
                    new HTMLTag('span').pushText('#'+role).append(roles);
                }
            }
            if(options.btnLbl){
                new HTMLTag('button').setText(options.btnLbl).append(li).onclick(()=>console.log('Clicked on id: '+user.id));
            }
            li.onclick(()=>console.log('Clicked on id: '+user.id)).append(appendPoint);
        }
    }
    if(options.admin){
        new HTMLTag('button').setText('Hozzáad').append(appendPoint);
        new HTMLTag('button').setText('Törlés').append(appendPoint);
    }
}


export function createTeamProjectsList(data,appendPoint){
    for(let project of data){
        if(project.name){
            const li = new HTMLTag('li');
            new HTMLTag('p').setText(project.name).append(li);
            li.onclick(()=>console.log('Clicked on project with id: '+project.id)).append(appendPoint);
        }
    }
}