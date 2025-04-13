import RequestChildren from "../../src/request/requestChildren.js";
import { GetDomResults, GetHtmlData } from "../utils/data.js";
import { CompareTagArrays } from "../utils/compare.js";

const domResults = GetDomResults();

test('Find children elements', ()=>{
    const aCreateAccount = GetHtmlData('aCreateAccount');
    const requestChildren = new RequestChildren(domResults);

    const children = requestChildren.findChildren(aCreateAccount);

    const spanUserAdd = GetHtmlData('spanUserAdd');
    const spanCreateAccount = GetHtmlData('spanCreateAccount');
    const expected = [{tagName : 'span', completeTag : GetHtmlData('spanUserAdd'), parentTag : GetHtmlData('aCreateAccount'), content:'', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : GetHtmlData('spanCreateAccount'), parentTag : GetHtmlData('aCreateAccount'), content:'Créer un compte', cssClass:'', cssId:'', contentOnlyText : true}];
    expect(CompareTagArrays(expected,children)).toBe(true);
});

test('Find children element impossible', ()=>{
    const aCreateAccount = GetHtmlData('spanUserAdd');
    const requestChildren = new RequestChildren(domResults);

    expect(()=>requestChildren.findChildren(aCreateAccount)).toThrow(`<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span> n'a aucun élément enfant`);
});