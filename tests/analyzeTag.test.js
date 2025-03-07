import AnalyzeTag from '../src/analyzeTag';

test('Analyze simple Tag without anything', ()=>{
    const html = '<title>Liste des Pokémon de la première génération — Poképédia</title>';
    const analyzeTag = new AnalyzeTag();
    const result = analyzeTag.analyzeData(html);

    const expected = {tagName : "title", content: "Liste des Pokémon de la première génération — Poképédia", cssClass:'', cssId : '', "contentOnlyText":true};
    expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
});

test('Analyze simple Tag with only one class css', async ()=>{
    const html = '<ul class="vector-menu-content-list"></ul>';
    const analyzeTag = new AnalyzeTag();
    const result = analyzeTag.analyzeData(html);

    const expected = {tagName : 'ul', content:'', cssClass : 'vector-menu-content-list', cssId : '', contentOnlyText : true};
    expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
});

test('Analyze simple Tag with one class css and texte', async ()=>{
    const html = '<span class="vector-dropdown-label-text">Outils personnels</span>';
    const analyzeTag = new AnalyzeTag();
    const result = analyzeTag.analyzeData(html);

    const expected = {tagName : 'span', content:'Outils personnels', cssClass : 'vector-dropdown-label-text', cssId : '', contentOnlyText : true};
    expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
});

test('Analyze Tags with two level, one class css and texte', async ()=>{
    const html = '<h1 class="firstHeading mw-first-heading"><span class="mw-page-title-main">Liste des Pokémon de la première génération</span></h1>';
    const analyzeTag = new AnalyzeTag();
    const result = analyzeTag.analyzeData(html);

    const expected = {tagName : 'h1', content:'<span class="mw-page-title-main">Liste des Pokémon de la première génération</span>', cssClass : 'firstHeading mw-first-heading', cssId : '', contentOnlyText : false};
    expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
});

test('Analyze Tags with one attribut, one class css and texte', async ()=>{
    const html = '<div id="vector-main-menu-pinned-container" class="vector-pinned-container">déplacer vers la barre latérale</div>';
    const analyzeTag = new AnalyzeTag();
    const result = analyzeTag.analyzeData(html);

    const expected = {tagName : 'div', content:'déplacer vers la barre latérale', cssClass : 'vector-pinned-container', cssId:'vector-main-menu-pinned-container',  contentOnlyText : true};
    expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
});

test('Analyze Tags with one attribut, one class css and texte (inverse last one)', async ()=>{
    const html = '<div class="vector-pinned-container" id="vector-main-menu-pinned-container">déplacer vers la barre latérale</div>';
    const analyzeTag = new AnalyzeTag();
    const result = analyzeTag.analyzeData(html);

    const expected = {tagName : 'div', content:'déplacer vers la barre latérale', cssClass : 'vector-pinned-container', cssId:'vector-main-menu-pinned-container',  contentOnlyText : true};
    expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
});

test('Analyze Tags with one attribut, two class css, and many sub element with texte', async ()=>{
    const html = '<li id="ca-view" class="selected vector-tab-noicon mw-list-item"><a href="/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration"><span>Lire</span></a></li>';
    const analyzeTag = new AnalyzeTag();
    const result = analyzeTag.analyzeData(html);

    const expected = {tagName : 'li', content:'<a href="/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration"><span>Lire</span></a>', cssClass : 'selected vector-tab-noicon mw-list-item', cssId:'ca-view',  contentOnlyText : false};
    expect(JSON.stringify(expected)).toBe(JSON.stringify(result));
});