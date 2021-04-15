import HTMLTag from '../../utilities/HTMLTag.js';
import createTeamInfoView from '../content/admin/team/oneTeamA.js';

/**data =teams */
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
/**data=teams */
export function createAllTeamsList(data,appendPoint,options){
    for(let team of data){
        const li = new HTMLTag('li');
        if(team.name && team.desc && team.id){
            li.onclick(createTeamInfoView);
            new HTMLTag('p').setText(team.name).append(li);
            const projectList = new HTMLTag('ul').append(li);
            for(let project of team.projects){
                if(project.name){
                    new HTMLTag('li').setText(project.name).append(projectList);
                }
            }
            const memP = new HTMLTag('p');
            for(let member of team.members){
                if(member.name){
                    memP.pushText(member.name +', ')
                }
            }
            memP.append(li);
            new HTMLTag('button').setText('X').append(li);
        }
        li.append(appendPoint);
    }
}
/** data =team.members */
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

/**data = team.projects */
export function createTeamProjectsList(data,appendPoint){
    for(let project of data){
        if(project.name){
            const li = new HTMLTag('li');
            new HTMLTag('p').setText(project.name).append(li);
            li.onclick(()=>console.log('Clicked on project with id: '+project.id)).append(appendPoint);
        }
    }
}