import { analyzeTag } from "../src/analyzeTag";
import { jest } from '@jest/globals';



test('Analyze simple Tag without anything', ()=>{
    const html = '<title>Liste des Pokémon de la première génération — Poképédia</title>';
    const result = analyzeTag(html);

    const expected = {tagName : "title", content: "Liste des Pokémon de la première génération — Poképédia", cssClass:''};
    expect(compareTwoAnalyzeTag(expected, result, "first")).toBe(true);
});

//1 class sans texte
test('Analyze simple Tag with only one class css', async ()=>{
    const html = '<ul class="vector-menu-content-list"></ul>';
    const result = analyzeTag(html);

    const expected = {tagName : 'ul', content:'', cssClass : 'vector-menu-content-list'};
    expect(compareTwoAnalyzeTag(expected, result, "second")).toBe(true);
});

//1 class avec texte 

//1 sous div 

//1 attribut 1 class

//1 attribut 1 class 1 sous div

//n attributs n class

//n attributs n class n sous div 

const compareTwoAnalyzeTag = (expectedTag, resultTag) => {
    console.log(JSON.stringify(expectedTag));
    console.log(JSON.stringify(resultTag));
    if(expectedTag.tagName === resultTag.tagName && expectedTag.content === resultTag.content
            && expectedTag.cssClass === resultTag.cssClass)
            {
                
                console.log("true");
                return true;
        }
    else{
        
            console.log("false");
            return false;
        }
}