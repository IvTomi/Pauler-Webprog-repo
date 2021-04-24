import HTMLTag from '../../utilities/HTMLTag.js';
import createTeamInfoView from '../content/admin/team/oneTeamA.js';

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

function getData(){
    if(sessionStorage.getItem('allTeams')){
        
    }
    //sessionStorage.setItem('hash',document.getElementById('hashForm_hash').value)
    //sessionStorage.removeItem('hash');
    //sessionStorage.getItem('hash')
}