import MultiSearch from "../../src/search/multiSearch.js";
import { CompareTagObject } from "../utils/compare.js";
import { GetDomResults } from "../utils/data.js";

const domResults = GetDomResults();

test('Test two requests', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute({parameters: '#pt-login > a', mode : 'tags'}); 

    const expected = [domResults[4]];
    expect(CompareTagObject(expected, result)).toBe(true);
});

test('Test three requests with many answers after', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute({parameters:'#pt-login > a > span', mode : 'tags'}); 

    const expected = [ domResults[5], domResults[6]];
    expect(CompareTagObject(expected, result)).toBe(true);
});