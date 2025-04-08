import Request from "../../src/request/request.js";

const domResults = [
    {tagName : 'title', content : '<title>Liste des Pokémon de la première génération — Poképédia</title>', contentOnlyText : false, cssClass : "", cssId :""},
    {tagName : 'span', content : '<span class="vector-dropdown-label-text">Menu principal</span>', contentOnlyText : false, cssClass : "vector-dropdown-label-text", cssId :""},
    {tagName : 'h1', content : '<h1 id="firstHeading" class="firstHeading mw-first-heading">Titre Présentation</h1>', contentOnlyText : false, cssClass : "firstHeading mw-first-heading", cssId :"firstHeading"},
    {tagName : 'span', content : '<span class="vector-dropdown-label-text">Sous menu principal</span>', contentOnlyText : false, cssClass : "vector-dropdown-label-text2", cssId :""},
    {tagName : 'li', content : '<li><a href="/Cat%C3%A9gorie:Liste_de_Pok%C3%A9mon" title="Catégorie:Liste de Pokémon">Liste de Pokémon</a></li>', contentOnlyText : false, cssClass : "", cssId :""}
];

test('Find tag with id firstHeading', ()=>{
    const request = new Request(domResults);

    const result = request.find('.firstHeading'); 

    const resultWaiting = [{tagName : 'h1', content : '<h1 id="firstHeading" class="firstHeading mw-first-heading">Titre Présentation</h1>', contentOnlyText : false, cssClass : "firstHeading mw-first-heading", cssId :"firstHeading"}];
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('Find tag with tagName title', ()=>{
    const request = new Request(domResults);

    const result = request.find('title'); 

    const resultWaiting = [{tagName : 'title', content : '<title>Liste des Pokémon de la première génération — Poképédia</title>', contentOnlyText : false, cssClass : "", cssId :""}];
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('Find tag with class firstHeading located with many class', ()=>{
    const request = new Request(domResults);

    const result = request.find('#firstHeading'); 

    const resultWaiting = [{tagName : 'h1', content : '<h1 id="firstHeading" class="firstHeading mw-first-heading">Titre Présentation</h1>', contentOnlyText : false, cssClass : "firstHeading mw-first-heading", cssId :"firstHeading"}];
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('Find tags with tagName span', ()=>{
    const request = new Request(domResults);

    const result = request.find('span'); 

    const resultWaiting = [{tagName : 'span', content : '<span class="vector-dropdown-label-text">Menu principal</span>', contentOnlyText : false, cssClass : "vector-dropdown-label-text", cssId :""},
        {tagName : 'span', content : '<span class="vector-dropdown-label-text">Sous menu principal</span>', contentOnlyText : false, cssClass : "vector-dropdown-label-text2", cssId :""}];
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('Find tags with className vector-dropdown-label-text', ()=>{
    const request = new Request(domResults);

    const result = request.find('#vector-dropdown-label-text'); 

    const resultWaiting = [{tagName : 'span', content : '<span class="vector-dropdown-label-text">Menu principal</span>', contentOnlyText : false, cssClass : "vector-dropdown-label-text", cssId :""},
        {tagName : 'span', content : '<span class="vector-dropdown-label-text">Sous menu principal</span>', contentOnlyText : false, cssClass : "vector-dropdown-label-text2", cssId :""}];
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});