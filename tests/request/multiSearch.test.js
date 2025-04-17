import MultiSearch from "../../src/search/multiSearch.js";
import { CompareTagObject } from "../utils/compare.js";
import { GetDomResults } from "../utils/data.js";

const domResults = GetDomResults();

//deuxième test le meme avec un niveau en plus avec les deux spans

//quatrieme test avec une union

//TODO revoir ce test mother fucker!!!!
test('Test two request', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute('#pt-login > a'); 

    const expected = [domResults[4]];
    expect(CompareTagObject(expected, result)).toBe(true);
});

test('Test three request with many answers after', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute('#pt-login > a > span'); 

    const expected = [ domResults[5], domResults[6]];
    expect(CompareTagObject(expected, result)).toBe(true);
});