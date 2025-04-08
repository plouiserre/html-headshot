export default class Request{
    constructor(domResults){
        this.domResults = domResults;
        this.type = '';
    }

    find = (parameters) =>{
        const type = this.detectTypeFinding(parameters);
        const value = type === 'tagName' ? parameters : parameters.substring(1, parameters.length);
        if(type === 'id'){
            return this.findById(value);
        }
        else if(type === 'class'){
            return this.findByCssClass(value);
        }
        else if(type ==='tagName'){
            return this.findByTag(value);
        }
        return null;
    } 

    detectTypeFinding = (parameters) =>{
        const firstCaracter = parameters[0];
        if(firstCaracter === ".")
            return 'id';
        else if(firstCaracter === "#")
            return 'class';
        else
            return 'tagName';
    }

    findById = (cssId)=>{
        let tags = [];
        for(let i = 0; i < this.domResults.length; i ++){
            const tagEvaluated = this.domResults[i];
            if(cssId === tagEvaluated.cssId){
                tags.push(tagEvaluated);
                break;
            }
            else{
                continue;
            }
        }
        return tags;
    };

    findByCssClass = (cssClass)=>{
        let tags = [];
            for(let i = 0; i < this.domResults.length; i ++){
                const tagEvaluated = this.domResults[i];
                if(tagEvaluated.cssClass.includes(cssClass)){
                    tags.push(tagEvaluated);
                }
                else{
                    continue;
                }
            }
            return tags;
    }

    findByTag = (tagName) =>{
        let tags = [];
        for(let i = 0; i < this.domResults.length; i ++){
            const tagEvaluated = this.domResults[i];
            if(tagName === tagEvaluated.tagName){
                tags.push(tagEvaluated);
            }
            else{
                continue;
            }
        }
        return tags;
    }
}