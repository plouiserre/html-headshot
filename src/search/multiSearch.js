import IdentifyRequest from "./identifyRequest";
import Search from "./search";

//TODO renommer cette classe
export default class MultiSearch{
    constructor(domResults){
        this.domResults = domResults;
    }

    execute = (parameters) => {
        const search = new Search(this.domResults);
        const identifyRequest = new IdentifyRequest(parameters);
        const requests = identifyRequest.analyze();
        for(let i = 0; i < requests.length; i ++){
            const request = requests[i];
        }
    }
}