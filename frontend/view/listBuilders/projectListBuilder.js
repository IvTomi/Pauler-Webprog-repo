import { getTaskAttributes } from "../../controllers/userOneProjectController.js";
import HTMLTag from "../../utilities/HTMLTag.js";
import createOneProjectView from "../../view/content/user/projects/oneProject.js";
import {router} from '../../index.js'
import {viewController} from '../../index.js';
import { SessionJanitor } from "../../utilities/sessionJanitor.js";

export function createMyProjectList(data,appendPoint,option){
    const ulList = new HTMLTag('div').addAttr('id','list');
    for(let project of data){

        const one = new HTMLTag('li').addAttr('class','listItem').onclick(()=>{
            SessionJanitor.setActiveProject(project)
            router.navigate('oneProjectUser')          
            
        });
        new HTMLTag('p').setText(project.Task.taskname).append(one);
        new HTMLTag('p').setText(project.Task.description).append(one);

        one.append(ulList); 
    }
    ulList.append(appendPoint);
}

export function createProjectMembersList(data,appendPoint){
    let div = new HTMLTag('div').addAttr('class','memberDiv').append(appendPoint);
    let one = new HTMLTag('ul').append(div);
    for(let member of data.Users){
        let li = new HTMLTag('li').addClass('listItem').append(one).onclick(()=>{
            router.navigate('ProfileUser',member.User.id)
        })
        new HTMLTag('img').addAttr('src','../../res/defaultUser.png').addAttr('alt','user képe').append(li);
        console.log('member: '+JSON.stringify(member))
        new HTMLTag('p').setText(member.User.firstname +' '+ member.User.lastname).append(li);
        new HTMLTag('p').setText(member.User.username).append(li);
    }

}

export function createProjectRecordList(data,appendPoint)
{
    console.log('data: '+JSON.stringify(data));
    let div = new HTMLTag('div').addAttr('id','list');

    for(let record of data.Records){
        record = record.Record;
        let li = new HTMLTag('li').addAttr('class','listItem').append(div)
        //new HTMLTag('li').setText(record.author).append(one); ennek nem tudom, hogy mi a neve
        new HTMLTag('p').setText(record.recorddate).append(li);
        new HTMLTag('p').setText(record.hour + ":" + record.min).append(li);
        new HTMLTag('p').setText(record.comment).append(li);
    }
    div.append(appendPoint).addClass('scroll');
}


export function createAllProjectList(data,appendPoint){
    const ulList = new HTMLTag('div');
    for(let project of data){
        const one = new HTMLTag('ul');
        new HTMLTag('li').setText(project.name).append(one);
        new HTMLTag('li').setText(project.description).append(one);
        new HTMLTag('li').setText(project.end).append(one);
        let tMembers = new HTMLTag('div').append(one);
        for(let member of project.members){
            new HTMLTag('img').addAttr('src',member.picture).addAttr('alt','user képe').append(tMembers);
        }
        new HTMLTag('button').setText('X').append(one);
        one.append(ulList); 
    }
    ulList.append(appendPoint);
}

export function CreateOneProjectMemberList(data, appendPoint){
    let div = new HTMLTag('div');
    let allMembers = new HTMLTag('div');
    new HTMLTag('p').setText('Hozzáadottak').append(div);
    let one = new HTMLTag('ul');
    for(let member of data){
        new HTMLTag('img').addAttr('src',member.picture).addAttr('alt','user képe').append(one);
        new HTMLTag('p').setText(member.name).append(one);
        new HTMLTag('button').setText("törlés").addClass('btn_del').append(one).onclick(()=>console.log('Clicked: '+ member.name));
        one.append(allMembers);
    }
    allMembers.append(div).addClass('scroll');
    div.append(appendPoint);
}

export function CreateOneProjectNonMemberList(data, appendPoint){
    let div = new HTMLTag('div');
    let allMembers = new HTMLTag('div');
    new HTMLTag('p').setText('Alkalmazottak').append(div);
    let one = new HTMLTag('ul');
    for(let member of data){
        new HTMLTag('img').addAttr('src',member.picture).addAttr('alt','user képe').append(one);
        new HTMLTag('p').setText(member.name).append(one);
        new HTMLTag('button').setText("Hozzáadás").addClass('btn_add').append(one).onclick(()=>console.log('Add: '+ member.id));
        one.append(allMembers);
    }
    allMembers.append(div).addClass('scroll');
    div.append(appendPoint);
}

export function CreateNewProjectNonTeamList(data,appendPoint){
    const div = new HTMLTag('div');
    const allTeams = new HTMLTag('div');
    new HTMLTag('p').setText('Csapatok').append(div);
    const one = new HTMLTag('ul');
    for(let team of data){
        new HTMLTag('p').setText(team.name).append(one);
        new HTMLTag('button').setText("Hozzáadás").addClass('btn_add').append(one).onclick(()=>console.log('Add: '+ team.id));
        one.append(allTeams);
    }
    allTeams.append(div).addClass('scroll');
    div.append(appendPoint);
}
