import { GetDomResults, GetHtmlData } from "../utils/data/dataDomResults.js";
import { CompareTagArrays } from "../utils/compare.js";
import SearchChildren from "../../src/search/searchChildren.js";

const domResults = GetDomResults();

test('Find children elements', ()=>{
    const aCreateAccount = GetHtmlData('aCreateAccount');
    const searchChildren = new SearchChildren(domResults);

    const children = searchChildren.findChildren(aCreateAccount);

    const expected = [{tagName : 'span', completeTag : GetHtmlData('spanUserAdd'), parentTag : GetHtmlData('aCreateAccount'), content:'', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : GetHtmlData('spanCreateAccount'), parentTag : GetHtmlData('aCreateAccount'), content:'Créer un compte', cssClass:'', cssId:'', contentOnlyText : true}];
    expect(CompareTagArrays(expected,children)).toBe(true);
});

test('Find children element impossible', ()=>{
    const aCreateAccount = GetHtmlData('spanUserAdd');
    const searchChildren = new SearchChildren(domResults);

    expect(()=>searchChildren.findChildren(aCreateAccount)).toThrow(`<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span> n'a aucun élément enfant`);
});