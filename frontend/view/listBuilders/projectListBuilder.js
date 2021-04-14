import projectTestData from "../../datasets/projectData.js";
import HTMLTag from "../../utilities/HTMLTag.js";

export function createMyProjectList(data,appendPoint){
    const ulList = new HTMLTag('div');
    for(let project of data){
        const one = new HTMLTag('ul');
        new HTMLTag('li').setText(project.name).append(one);
        new HTMLTag('li').setText(project.description).append(one);
        one.append(ulList); 
    }
    ulList.append(appendPoint);
}

export default createMyProjectList;