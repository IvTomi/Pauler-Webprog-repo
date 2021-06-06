import { getTaskAttributes } from "../../controllers/userOneProjectController.js";
import HTMLTag from "../../utilities/HTMLTag.js";
import createOneProjectView from "../../view/content/user/projects/oneProject.js";

export function createMyProjectList(data,appendPoint,option){
    const ulList = new HTMLTag('div');
    for(let project of data){
        const one = new HTMLTag('ul').onclick(()=>createOneProjectView(project.Task.id,project.Task.taskname,project.Task.description));
        new HTMLTag('li').setText(project.Task.taskname).append(one);
        new HTMLTag('li').setText(project.Task.description).append(one);
        one.append(ulList); 
    }
    ulList.append(appendPoint);
}

export function createProjectMembersList(data,appendPoint){
    console.log(data);
    let div = new HTMLTag('div');
    let one = new HTMLTag('ul').append(div);
    for(let User of data.Users){
        new HTMLTag('img').addAttr('src',User.User.picture).addAttr('alt','').append(one);
        new HTMLTag('li').setText(User.User.firstname + " " + User.User.lastname).append(one);
    }
    div.append(appendPoint).addClass('scroll');

}

export function createProjectRecordList(data,appendPoint)
{
    console.log(data);
    let div = new HTMLTag('div');
    let one = new HTMLTag('ul').append(div);
    for(let record of data){
        record = record.Record;
        //new HTMLTag('li').setText(record.author).append(one); ennek nem tudom, hogy mi a neve
        new HTMLTag('li').setText(record.recorddate + " " + record.hour + ":" + record.min).append(one);
        new HTMLTag('li').setText(record.comment).append(one);
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
