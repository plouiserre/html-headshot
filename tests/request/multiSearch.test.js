import MultiSearch from "../../src/search/multiSearch.js";
import { CompareTagObject } from "../utils/compare.js";
import { GetDomResults } from "../utils/data/dataDomResults.js";
import { GetTableResults } from "../utils/data/dataTableResults.js";

const domResults = GetDomResults();
const tableResults = GetTableResults();

test('Test two requests', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute({parameters: '#pt-login > a', mode : 'tags'}); 

    const expected = [domResults[4]];
    expect(CompareTagObject(expected, result)).toBe(true);
});

test('Test three requests with many answers after', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute({parameters:'#pt-login > a > span', mode : 'tags'}); 

    const expected = [domResults[5], domResults[6]];
    expect(CompareTagObject(expected, result)).toBe(true);
});


test('Test three requests with one answer text', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute({parameters:'#pt-login > a > span', mode : 'text'}); 

    const expected = ['Se connecter'];
    expect(CompareTagObject(expected, result)).toBe(true);
});


test('Test one requests with many texts', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute({parameters:'span', mode : 'text'}); 

    const expected = ['Se connecter', 'Créer un compte'];
    expect(CompareTagObject(expected, result)).toBe(true);
});

test('Retrieve all texts from one table', ()=>{
    const multiSearch = new MultiSearch(tableResults);

    const result = multiSearch.execute({parameters : 'table', mode : 'text'});

    const expected = ['Numéro', 'Nom français', 'Types', '001', 'Bulbizarre', 'Plante Poison', '002', 'Herbizarre', 'Plante Poison', '003', 'Florizarre', 'Plante Poison'];
    expected(CompareTagObject(expected, result)).toBe(true);
})