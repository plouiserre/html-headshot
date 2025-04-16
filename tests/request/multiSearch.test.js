import MultiSearch from "../../src/search/multiSearch.js";
import { CompareTagObject } from "../utils/compare.js";
import { GetDomResults } from "../utils/data.js";

const domResults = GetDomResults();

//deuxième test le meme avec un niveau en plus avec les deux spans

//quatrieme test avec une union

test('Test two request', ()=>{
    const multiSearch = new MultiSearch(domResults);

    const result = multiSearch.execute('.liLogin > a'); 

    const expected = [domResults[4]];
    expected(CompareTagObject(result, expected)).toBeTrue(true);
});