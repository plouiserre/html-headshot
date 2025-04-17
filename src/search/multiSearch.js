import IdentifyRequest from "./identifyRequest";
import Search from "./search";
import SearchChildren from "./searchChildren"

//TODO renommer cette classe
export default class MultiSearch{
    constructor(domResults){
        this.domResults = domResults;
    }


    //TODO il faut trouver un système pour explorer correctement
    execute = (parameters) => {
        let finalResult = [];
        const identifyRequest = new IdentifyRequest(parameters);
        const requests = identifyRequest.analyze();
        let domToExplore = this.domResults;
        Object.entries(requests).forEach(([key, value])=>{
            finalResult = [];
            const search = new Search(domToExplore);
            const result = search.find(key,  value);
            if(result.length == 1)
                domToExplore = this.findDomToExplore(result[0].completeTag);
            else 
                domToExplore = '';
            for(let i = 0; i < result.length ; i++)
                finalResult.push(result[i]);
        })
        return finalResult;
    }

    findDomToExplore = (parent) =>{
       const searchChildren = new SearchChildren(this.domResults);
       const children =  searchChildren.findChildren(parent);
       return children;
    }
}