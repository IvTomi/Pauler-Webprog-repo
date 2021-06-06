import { onTeamClicked } from "../../controllers/userMyTeamsController.js";
import { onTaskClicked } from "../../controllers/userOneTeamController.js";
import HTMLTag from "../../utilities/HTMLTag.js";

export function createMyTeamsList(data,appendPoint){
    appendPoint = document.getElementById('list');
    
    for(let Team of data){
        const li = new HTMLTag('li');
        if(Team.Team.teamname && Team.Team.id){
            li.onclick(() => {onTeamClicked(Team.Team)});
            new HTMLTag('p').setText(Team.Team.teamname).append(li);
            new HTMLTag('p').setText(Team.Team.description).append(li);
            
        }
        li.append(appendPoint);
    }
}

export function createTeamMemberList(users,appendpoint){
    appendpoint = document.getElementById('members');
    for(let user of users){
        const li = new HTMLTag('li');
        const tag = user.Tag;
        user = user.User;
        new HTMLTag('p').setText(user.lastname+' '+user.firstname).append(li);
        if(tag){
            new HTMLTag('p').setText('# '+tag).append(li);  
        }
        li.append(appendpoint);

    }
    
}

export function createTeamProjectList(projects,appendPoint){
    appendPoint = document.getElementById('projects');
    console.log(projects)
    for(let project of projects){
        const li = new HTMLTag('li');
        project = project.Task;
        new HTMLTag('p').setText(project.taskname).append(li);
        li.onclick(()=>onTaskClicked(project)).append(appendPoint);
    }
}