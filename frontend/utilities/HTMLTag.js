/**A class for creating HTML structures with flowing setters */
class HTMLTag{
    /**tag== htmlTag */
    constructor(tag){
        tag = tag.toString();
        this.node = document.createElement(tag);
        return this;
    };
    /** Overrides the first argument (attribute) with the second (value)*/
    addAttr(attr, value){
        this.node.setAttribute(attr,value);
        return this;
    }

    clear(){
        this.node.innerHTML = "";
        return this
    }

    /**Adds a class to the elements class list */
    addClass(value){
        this.node.classList.add(value);
        return this;
    }
    /**Overrides the text content of the HTMLElement */
    setText(text){
        this.node.textContent = text;
        return this;
    }
    /** Adds text to the end of the tag*/
    pushText(text){
        this.node.innerHTML += text;
        return this;
    }
    /**Appends this element to the given one */
    append(tag){
        if(tag instanceof HTMLTag){
            tag.node.appendChild(this.node);
        }
        else{
            tag.appendChild(this.node);
        }
        return this;
    }


    insertBefore(tag){
        if(tag instanceof HTMLTag){
            tag.node.insertBefore(this.node,tag.node.childNodes[0]);
        }
        else{
            tag.insertBefore(this.node,tag.childNodes[0]);
        }
    }
    /**Appends this element to the given one */
    prepend(tag){
        if(tag instanceof HTMLTag){
            tag.node.prepend(this.node);
        }
        else{
            tag.prepend(this.node);

        }
        return this;
    }
    /**Adds the given function to the click event */
    onclick(func){
        this.node.onclick = func;
        return this;
    }
    addEventListener(event,method){
        this.node.addEventListener(event,method);
        return this;
    }  
    /**Prevents default action on given event of this element */
    preventDefaultEvent(eventname){
        this.addEventListener(eventname,(event)=>{
            event.preventDefault();
        });
        return this;
    } 
    
}

export default HTMLTag;