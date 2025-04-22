import IdentifyRequest from "../../src/search/identifyRequest";
import {  CompareTagObject } from "../utils/compare";

test('identify the request writing clear with only tag', ()=>{
    const request = {path :'.news > td > .headlines > span > li', mode : 'tag'};
    const identifyRequest = new IdentifyRequest(request);

    const result = identifyRequest.analyze();

    let expected = constructExpectedResult("tag");


    expect(CompareTagObject(expected, result)).toBe(true);
})

test('identify the request writing clear with only text', ()=>{
    const request = {path : '.news > td > .headlines > span > li', mode : 'text'};
    const identifyRequest = new IdentifyRequest(request);

    const result = identifyRequest.analyze();

    let expected = constructExpectedResult("text");

    expect(CompareTagObject(expected, result)).toBe(true);
})

constructExpectedResult = (mode) =>{
    let expected ={
        keywords : {
            "news" : "class",
            "td" : "tagName",
            "headlines" : "class",
            "span" : "tagName",
            "li" : "tagName"
        },
        mode : mode
    };
    return expected;
}

//TODO voir si on a deux fois la même balise dans la chaîne !!!!!!!