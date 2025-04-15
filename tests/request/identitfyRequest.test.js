import IdentifyRequest from "../../src/request/identifyRequest";
import { CompareTagArrays, CompareTagsDictionnary } from "../utils/compare";

test('identify the request writing clear', ()=>{
    const request = '.news > td > .headlines > span > li';
    const identifyRequest = new IdentifyRequest(request);

    const result = identifyRequest.analyze();

    const expected ={};
    expected["news"] = "class";
    expected["td"] = "tagName";
    expected["headlines"] = "class";
    expected["span"] = "tagName";
    expected["li"] = "tagName";

    expect(CompareTagsDictionnary(expected, result)).toBe(true);
})

//TODO voir si on a deux fois la même balise dans la chaîne !!!!!!!