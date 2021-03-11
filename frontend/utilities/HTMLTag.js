class HTMLTag{
    constructor(tag){
        tag = tag.toString();
        this.node = document.createElement(tag);
        return this;
    };
    
    addAttr(attr, value){
        this.node.setAttribute(attr,value);
        return this;
    }


    addClass(value){
        this.node.classList.add(value);
        return this;
    }

    setText(text){
        this.node.innerHTML = text;
        return this;
    }

    pushText(text){
        this.node.innerHTML += text;
        return this;
    }

    append(tag){
        if(tag instanceof HTMLTag){
            tag.node.appendChild(this.node);
        }
        else{
            tag.appendChild(this.node);
        }
        return this;
    }

    onclick(func){
        this.node.onclick = func;
        return this;
    }
}

export default HTMLTag;