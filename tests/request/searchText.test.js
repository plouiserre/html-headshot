import SearchText from "../../src/search/searchText";
import { GetDomResults } from "../utils/data";
import { CompareTagArrays } from "../utils/compare";

const domResults = GetDomResults();

test('find text in simple tag', ()=>{
    const span = domResults[9];
    const search = new SearchText(domResults, span);

    const result = search.find();

    const expected = ["Créer un compte"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})

test('find text in a tag with two levels', ()=>{
    const a = domResults[7];
    const search = new SearchText(domResults, a);

    const result = search.find();

    const expected = ["Créer un compte"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})

test('find text in a tag with three levels', ()=>{
    const li = domResults[2];
    const search = new SearchText(domResults, li);

    const result = search.find();

    const expected = ["Créer un compte"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})

test('find text in a tag with fourth levels', ()=>{
    const ul = domResults[0];
    const search = new SearchText(domResults, ul);

    const result = search.find();

    const expected = ["Se connecter", "Créer un compte"];
    expect(CompareTagArrays(expected, result)).toBe(true);
})

//faire un test où y a rien et ca renvoie une erreur
test('cannot find any text in a tag', ()=>{
    const span = domResults[8];
    const search = new SearchText(domResults, span);

    expect(()=>search.find()).toThrow(`La balise span n'a aucun texte`);
})