import Search from "../../src/search/search.js";
import { CompareTagObject } from "../utils/compare.js";
import { GetDomResults, GetHtmlData } from "../utils/data.js";

const domResults = GetDomResults();

test('Find tag with class vector-menu-content-list', ()=>{
    const search = new Search(domResults);

    const result = search.find('.vector-menu-content-list'); 

    const expected = [domResults[1]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tag with tagName title', ()=>{
    const search = new Search(domResults);

    const result = search.find('ul'); 

    const expected = [domResults[1]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tag with id pt-createaccount located with many class', ()=>{
    const search = new Search(domResults);

    const result = search.find('#pt-createaccount'); 

    const expected = [domResults[2]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tags with tagName span', ()=>{
    const search = new Search(domResults);

    const results = search.find('span'); 

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
    const search = new Search(domResults);

    const results = search.find('.user-links-collapsible-item mw-list-item'); 

    const liFirstExpected = domResults[2];
    const liSecondExpected = domResults[3]; 
    expect(CompareTagObject(liFirstExpected,results[0])).toBe(true);
    expect(CompareTagObject(liSecondExpected,results[1])).toBe(true);
});

test('Find tags with classNames vector-icon', ()=>{
    const search = new Search(domResults);

    const results = search.find('.vector-icon'); 

    const liFirstExpected = domResults[5];
    const liSecondExpected = domResults[8]; 
    expect(CompareTagObject(liFirstExpected,results[0])).toBe(true);
    expect(CompareTagObject(liSecondExpected,results[1])).toBe(true);
});

test('Find no tags with className vector', ()=>{
    const search = new Search(domResults);

    expect(()=>search.find('.vector')).toThrow(`La classe vector n'est attribuée à aucun élément`);

});

test('Find no tags title', ()=>{
    const search = new Search(domResults);

    expect(()=>search.find('title')).toThrow(`La balise title n'est attribuée à aucun élément`);
});

test('Find no tags with id main', ()=>{
    const search = new Search(domResults);

    expect(()=>search.find('#main')).toThrow(`L'id main n'est attribuée à aucun élément`);
});