
class Router{
    routes = [];
    mode = null;
    root = '/';

    constructor(options){
        this.mode = window.history.pushState ? 'history':'hash';
        if(options.mode) this.mode = options.mode;
        if(options.root) this.root = options.root;
    }

    /**Adds an endpoint to the router (cb used for callback function)*/
    add = (path,cb)=>{
        this.routes.push({path,cb});
        return this;
    }

    /**Removes endpoint from routes */
    remove = path =>{
        this.routes = this.routes.filter(x=>x.path !== path);
        return this;
    }

    /**Clears all endpoints */
    flush = () =>{
        this.routes = [];
        return this;
    }

    clearSlashes = path =>
        path.toString().replace(/\/$/,'').replace(/^\//,'');

    replaceRoot = (fragment)=>{
         return this.root !== '/' ? fragment.replace(this.root,''):fragment;
    }
    
    getMatch = (match)=>{
        return match? match[1]:'';
    }

    getFragment = () => {
        if(this.mode === 'history'){
            console.log(window.location.search);
            return this.clearSlashes(this.replaceRoot(decodeURI(window.location.pathname + window.location.search).replace(/\?(.*)$/,'')));
        }else{
            return this.clearSlashes(this.getMatch(window.location.href.match(/#(.*)$/)));
        }
    }

    /**used for navigation between added routes */
    navigate = (path = '') =>{
        console.log(path);
        if(this.routes.some(element=>element['path']===path)){
            if(this.mode === 'history'){
                window.history.pushState(null,null,this.root + path);
                this.routes.find(element=>element['path']===path)['cb'].apply();
            }else{
                window.location.href = `${window.location.href.replace(/#(.*)$/,'')}#${path}`;
            }
        }else{
            
        }
        
        return this;
    }
}

export default Router;