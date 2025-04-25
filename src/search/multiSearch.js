import IdentifyRequest from "./identifyRequest.js";
import Search from "./search.js";
import SearchChildren from "./searchChildren.js"

export default class MultiSearch{
    constructor(domResults){
        this.domResults = domResults;
    }

    // ok l'erreur vient de là car en gros je ne creuse pas assez pour avoir les textes donc il faut que je revois 
    // cette classe et le workflow en dessous
    execute = (options) => {
        const mode = options.mode;
        let finalResult = [];
        let requests = this.identifyAllRequest(options);
        finalResult = this.retrieveSearchTags(requests.keywords, mode);
        if(mode === "tags")
            return finalResult;
        else{
            const texts = this.getTexts(finalResult);
            return texts;
        }
    }

    identifyAllRequest = (options)=>{
        const parameters = { path : options.parameters, mode : options.mode};
        const identifyRequest = new IdentifyRequest(parameters);
        const requests = identifyRequest.analyze();
        return requests;
    }

    retrieveSearchTags = (keywords, mode) => {
        let finalResult = [];
        let domToExplore = this.domResults;
        Object.entries(keywords).forEach(([key, value])=>{
            finalResult = [];
            const search = new Search(domToExplore);
            const options = {identifier : key, type : value, mode : "tags" };
            const results = search.find(options);
            for(let i = 0; i < results.length ; i++)
                finalResult.push(results[i]);
            domToExplore = this.findDomToExplore(results);
        });
        return finalResult;
    }

    findDomToExplore = (parents) =>{
        let children = '';
        if(parents.length == 1){
            const parentHtml = parents[0].completeTag;
            const searchChildren = new SearchChildren(this.domResults);
            children =  searchChildren.findChildren(parentHtml);
        }
        return children;
    }

    getTexts = (tags) =>{
        const texts = [];
        for(let i = 0; i < tags.length; i ++){
            const tag = tags[i];
            if(tag.contentOnlyText && tag.content !==''){
                texts.push(tag.content);
            }
        }
        return texts;
    }
}