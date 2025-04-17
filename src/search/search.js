export default class Search{
    constructor(domResults){
        this.domResults = domResults;
        this.type = '';
    }

    find = (identifier, type) =>{
        if(type === 'id'){
            return this.findById(identifier);
        }
        else if(type === 'class'){
            return this.findByCssClass(identifier);
        }
        else if(type ==='tagName'){
            return this.findByTag(identifier);
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
        if(tags.length === 0)
            throw new Error(`L'id ${cssId} n'est attribuée à aucun élément`);
        return tags;
    };

    findByCssClass = (cssClass)=>{
        let tags = [];
            for(let i = 0; i < this.domResults.length; i ++){
                const tagEvaluated = this.domResults[i];
                if(this.isACssClass(tagEvaluated.cssClass,cssClass)){
                    tags.push(tagEvaluated);
                }
                else{
                    continue;
                }
            }
            if(tags.length === 0)
                throw new Error(`La classe ${cssClass} n'est attribuée à aucun élément`);
            return tags;
    }

    isACssClass = (allCssClass, cssClassCandidate) => {
        const isMultipleCssClass = cssClassCandidate.split(' ').length > 1 ? true : false;
        if(isMultipleCssClass){
            return allCssClass === cssClassCandidate;
        }
        else {
            return this.checkSimpleCssClass(allCssClass, cssClassCandidate);
        }
    };


    checkSimpleCssClass = (allCssClass, cssClassCandidate) =>{
        let result = false;
        const cssClasses = allCssClass.split(' ');
        for(let i = 0; i < cssClasses.length; i++){
            const cssClass = cssClasses[i].trim();
            if(cssClass === cssClassCandidate){
                result = true;
                break;
            }
            else{
                continue;
            }
        }
        return result;
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
        if(tags.length === 0)
            throw new Error(`La balise ${tagName} n'est attribuée à aucun élément`);
        return tags;
    }
}