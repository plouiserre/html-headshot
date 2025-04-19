import IdentifyRequest from "./identifyRequest";
import Search from "./search";
import SearchChildren from "./searchChildren"

export default class MultiSearch{
    constructor(domResults){
        this.domResults = domResults;
    }

    execute = (options) => {
        const parameters = options.parameters;
        const mode = options.mode;
        let finalResult = [];
        const identifyRequest = new IdentifyRequest(parameters);
        const requests = identifyRequest.analyze();
        let domToExplore = this.domResults;
        Object.entries(requests).forEach(([key, value])=>{
            finalResult = [];
            const search = new Search(domToExplore);
            const options = {identifier : key, type : value, mode : mode };
            const results = search.find(options);
            for(let i = 0; i < results.length ; i++)
                finalResult.push(results[i]);
            domToExplore = this.findDomToExplore(results);
        })
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
}