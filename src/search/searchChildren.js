export default class SearchChildren{
    constructor(domResults){
        this.domResults = domResults;
    }

    findChildren(parentHtml){
        const children = [];
        for(let i = 0; i < this.domResults.length; i ++){
            const element = this.domResults[i];
            if(element.parentTag === parentHtml)
                children.push(element);
        }
        if(children.length == 0)
            throw new Error(`${parentHtml} n'a aucun élément enfant`);
        return children;
    }
}