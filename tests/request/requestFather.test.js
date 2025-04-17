// import RequestFather from "../../src/request/requestFather.js";
// import { GetDomResults, GetHtmlData } from "../utils/data.js";
// import { CompareTagObject } from "../utils/compare.js";

// const domResults = GetDomResults();

// test('Find father element', ()=>{
//     const html = GetHtmlData('html');
//     const requestFather = new RequestFather(domResults);

//     const father = requestFather.findFather(html);

//     const ulTag = GetHtmlData('ulTag');
//     const expected = {tagName : 'div', completeTag : html, parentTag : '' ,content:ulTag, cssClass : 'vector-menu-content', cssId : '', contentOnlyText : false};
//     expect(CompareTagObject(expected,father)).toBe(true);
// });

// test('Find father element impossible', ()=>{
//     const requestFather = new RequestFather(domResults);

//     expect(()=>requestFather.findFather('<body>New page with no tags</body>')).toThrow("Impossible de trouver la balise <body>New page with no tags</body> comme balise père");
// });