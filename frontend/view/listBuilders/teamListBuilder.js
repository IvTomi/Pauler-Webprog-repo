import HTMLTag from '../../utilities/HTMLTag.js';
import createTeamInfoView from '../content/user/teams/oneTeamU.js';


export function createMyTeamsList(data,appendPoint,options){
    
    for(let team of data){
        const li = new HTMLTag('li');
        if(team.name && team.desc && team.id){
            li.onclick(createTeamInfoView);
            new HTMLTag('p').setText(team.name).append(li);
            new HTMLTag('p').setText(team.desc).append(li);
            const memP = new HTMLTag('p');
            for(let member of team.members){
                if(member.name){
                    memP.pushText(member.name +', ')
                }
            }
            memP.append(li);
        }
        li.append(appendPoint);
    }
   
}

export function createTeamMembersList(data,appendPoint){
    
    for(let user of data){
        if(user.name){
            const li = new HTMLTag('li');
            new HTMLTag('p').setText(user.name).append(li);
            if(user.roles){
                const roles = new HTMLTag('p').append(li);
                for(let role of user.roles){
                    new HTMLTag('span').pushText('#'+role).append(roles);
                }
            }
            li.onclick(()=>console.log('Clicked on id: '+user.id)).append(appendPoint);
        }
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