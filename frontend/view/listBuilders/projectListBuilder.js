import HTMLTag from "../../utilities/HTMLTag.js";

export function createMyProjectList(data,appendPoint,option){
    

    const ulList = new HTMLTag('div');
    for(let project of data){
        const one = new HTMLTag('ul');
        new HTMLTag('li').setText(project.name).append(one);
        new HTMLTag('li').setText(project.description).append(one);
        one.append(ulList); 
    }
    ulList.append(appendPoint);
}

export function createProjectMembersList(data,appendPoint){
    let div = new HTMLTag('div');
    let one = new HTMLTag('ul').append(div);
    for(let member of data[0].members){
        new HTMLTag('img').addAttr('src',member.picture).addAttr('alt','user képe').append(one);
        new HTMLTag('li').setText(member.name).append(one);
        new HTMLTag('li').setText(member.post).append(one);
    }
    div.append(appendPoint).addClass('scroll');

}

export function createProjectRecordList(data,appendPoint)
{
    let div = new HTMLTag('div');
    let one = new HTMLTag('ul').append(div);
    for(let record of data[0].records){
        new HTMLTag('li').setText(record.author).append(one);
        new HTMLTag('li').setText(record.dateTime).append(one);
        new HTMLTag('li').setText(record.message).append(one);
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

