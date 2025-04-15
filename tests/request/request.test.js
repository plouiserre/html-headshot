import Request from "../../src/request/request.js";
import { CompareTagObject } from "../utils/compare.js";
import { GetDomResults, GetHtmlData } from "../utils/data.js";

const domResults = GetDomResults();

test('Find tag with class vector-menu-content-list', ()=>{
    const request = new Request(domResults);

    const result = request.find('.vector-menu-content-list'); 

    const expected = [domResults[1]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tag with tagName title', ()=>{
    const request = new Request(domResults);

    const result = request.find('ul'); 

    const expected = [domResults[1]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tag with id pt-createaccount located with many class', ()=>{
    const request = new Request(domResults);

    const result = request.find('#pt-createaccount'); 

    const expected = [domResults[2]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tags with tagName span', ()=>{
    const request = new Request(domResults);

    const results = request.find('span'); 

    const spanFirstExpected = domResults[5];
    const spanSecondExpected = domResults[6];
    const spanThirdExpected = domResults[8];
    const spanFourthExpected = domResults[9];
    expect(CompareTagObject(spanFirstExpected,results[0])).toBe(true);
    expect(CompareTagObject(spanSecondExpected,results[1])).toBe(true);
    expect(CompareTagObject(spanThirdExpected,results[2])).toBe(true);
    expect(CompareTagObject(spanFourthExpected,results[3])).toBe(true);
});

test('Find tags with all classNames user-links-collapsible-item mw-list-item', ()=>{
    const request = new Request(domResults);

    const results = request.find('.user-links-collapsible-item mw-list-item'); 

    const liFirstExpected = domResults[2];
    const liSecondExpected = domResults[3]; 
    expect(CompareTagObject(liFirstExpected,results[0])).toBe(true);
    expect(CompareTagObject(liSecondExpected,results[1])).toBe(true);
});

test('Find tags with classNames vector-icon', ()=>{
    const request = new Request(domResults);

    const results = request.find('.vector-icon'); 

    const liFirstExpected = domResults[5];
    const liSecondExpected = domResults[8]; 
    expect(CompareTagObject(liFirstExpected,results[0])).toBe(true);
    expect(CompareTagObject(liSecondExpected,results[1])).toBe(true);
});

test('Find no tags with className vector', ()=>{
    const request = new Request(domResults);

    expect(()=>request.find('.vector')).toThrow(`La classe vector n'est attribuée à aucun élément`);

});

test('Find no tags title', ()=>{
    const request = new Request(domResults);

    expect(()=>request.find('title')).toThrow(`La balise title n'est attribuée à aucun élément`);
});

test('Find no tags with id main', ()=>{
    const request = new Request(domResults);

    expect(()=>request.find('#main')).toThrow(`L'id main n'est attribuée à aucun élément`);
});