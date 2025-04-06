export default class Request{
    constructor(domResults){
        this.domResults = domResults;
    }

    find = (parameters) =>{
        if(parameters.type === 'id'){
            return this.findById(parameters.value);
        }
        else if(parameters.type === 'class'){
            return this.findByCssClass(parameters.value);
        }
        else if(parameters.type ==='tagName'){
            return this.findByTag(parameters.value);
        }
        return null;
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