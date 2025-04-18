import SearchChildren from "./searchChildren";

export default class SearchText{
    constructor(domResults, tag){
        this.children = [];
        this.parents = [];
        this.domResults = domResults;
        this.tag = tag;
        this.content = [];
    }

    find = ()=>{
        if(this.tag.contentOnlyText){
            if(this.tag.content !== '')
                this.content.push(this.tag.content);
        }
        else{
            this.findChildrenText();
        }
        if(this.content.length == 0)
            throw new Error(`La balise ${this.tag.tagName} n'a aucun texte`);
        return this.content;
    }

    findChildrenText = ()=>{
        const elements = this.findAllChildren();
        for(let i = 0; i < elements.length ; i++){
            const element = elements[i];
            if(element.contentOnlyText && element.content != ''){
                this.content.push(element.content);
            }
        }
    }

    findAllChildren = () =>{
        this.searchChildrenAddResultsArrays(this.tag.completeTag);
        while(this.parents.length > 0){
            const parent = this.parents.pop();
            if(parent.contentOnlyText)
                continue;
            else{
                this.searchChildrenAddResultsArrays(parent.completeTag);
            }
        }
        return this.children;
    }

    searchChildrenAddResultsArrays = (completeTag) =>{
        const searchChildren = new SearchChildren(this.domResults);
        const elements = searchChildren.findChildren(completeTag);
        for(let i = 0; i < elements.length; i ++){
            const element = elements[i];
            this.children.push(element);
            this.parents.push(element);
        }
    }

    findOtherChildren = (parent) =>{
        const searchChildren = new SearchChildren(this.domResults);
        const children = searchChildren.findChildren(parent.completeTag); 
        return children;
    }
}