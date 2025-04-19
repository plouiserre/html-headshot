import Search from "../../src/search/search.js";
import { CompareTagObject, CompareTagArrays } from "../utils/compare.js";
import { GetDomResults } from "../utils/data.js";

const domResults = GetDomResults();

test('Find tag with class vector-menu-content-list', ()=>{
    const search = new Search(domResults);
    
    const result = search.find({identifier :'vector-menu-content-list', type:'class', mode:'tags'}); 

    const expected = [domResults[1]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tag with tagName title', ()=>{
    const search = new Search(domResults);

    const result = search.find({identifier :'ul', type:'tagName', mode:'tags'}); 

    const expected = [domResults[1]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tag with id pt-createaccount located with many class', ()=>{
    const search = new Search(domResults);

    const result = search.find({identifier :'pt-createaccount', type :'id', mode:'tags'}); 

    const expected = [domResults[2]];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Find tags with tagName span', ()=>{
    const search = new Search(domResults);

    const results = search.find({identifier :'span', type:'tagName', mode:'tags'}); 

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

    const results = search.find({identifier :'user-links-collapsible-item mw-list-item', type:'class', mode:'tags'}); 

    const liFirstExpected = domResults[2];
    const liSecondExpected = domResults[3]; 
    expect(CompareTagObject(liFirstExpected,results[0])).toBe(true);
    expect(CompareTagObject(liSecondExpected,results[1])).toBe(true);
});

test('Find tags with classNames vector-icon', ()=>{
    const search = new Search(domResults);

    const results = search.find({identifier :'vector-icon', type:'class', mode:'tags'}); 

    const liFirstExpected = domResults[5];
    const liSecondExpected = domResults[8]; 
    expect(CompareTagObject(liFirstExpected,results[0])).toBe(true);
    expect(CompareTagObject(liSecondExpected,results[1])).toBe(true);
});

test('Find no tags with className vector', ()=>{
    const search = new Search(domResults);

    expect(()=>search.find({identifier :'vector', type:'class', mode:'tags'})).toThrow(`La classe vector n'est attribuée à aucun élément`);

});

test('Find no tags title', ()=>{
    const search = new Search(domResults);

    expect(()=>search.find({identifier :'title', type:'tagName', mode:'tags'})).toThrow(`La balise title n'est attribuée à aucun élément`);
});

test('Find no tags with id main', ()=>{
    const search = new Search(domResults);

    expect(()=>search.find({identifier :'main', type:'id', mode:'tags'})).toThrow(`L'id main n'est attribuée à aucun élément`);
});

test('Find texts in ul tag', ()=>{
    const search = new Search(domResults);

    const result = search.find({identifier :'ul', type:'tagName', mode:'text'});
    
    const expected = ["Se connecter", "Créer un compte"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})

test('Find texts in spans tags', ()=>{
    const search = new Search(domResults);

    const result = search.find({identifier :'span', type:'tagName', mode:'text'});
    
    const expected = ["Se connecter", "Créer un compte"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})

test('Find texts in class mw-list-item', ()=>{
    const search = new Search(domResults);

    const result = search.find({identifier :'mw-list-item', type:'class', mode:'text'});
    
    const expected = ["Créer un compte", "Se connecter"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})


test('Find texts in class mw-list-item', ()=>{
    const search = new Search(domResults);

    const result = search.find({identifier :'pt-login', type:'id', mode:'text'});
    
    const expected = ["Se connecter"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})