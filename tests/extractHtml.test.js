import ExtractHtml from "../src/extractHtml";

test('can extract simple html', ()=>{
    const html = '<title>Liste des Pokémon de la première génération — Poképédia</title>';
    const extractHtml = new ExtractHtml(70);
    const result = extractHtml.extract(html);

    const resultWaiting = '<title>Liste des Pokémon de la première génération — Poképédia</title>';
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('can extract simple html with other html', ()=>{
    const html = '<title>Liste des Pokémon de la première génération — Poképédia</title><script>(function(){var className="client-js vector-feature-language-in-header';
    const extractHtml = new ExtractHtml(70);
    const result = extractHtml.extract(html);

    const resultWaiting = '<title>Liste des Pokémon de la première génération — Poképédia</title>';
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('can extract simple html with other html and a space ahead', ()=>{
    const html = ' <title>Liste des Pokémon de la première génération — Poképédia</title><script>(function(){var className="client-js vector-feature-language-in-header';
    const extractHtml = new ExtractHtml(71);
    const result = extractHtml.extract(html);

    const resultWaiting = '<title>Liste des Pokémon de la première génération — Poképédia</title>';
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('can extract simple html with other html, and ahead many spaces between : and before', ()=>{
    const html = '  :  <ul><li><a href="/Cat%C3%A9gorie:Liste_de_Pok%C3%A9mon" title="Catégorie:Liste de Pokémon">Liste de Pokémon</a></li><li><a href="/Cat%C3%A9gorie:Pok%C3%A9mon_de_la_troisi%C3%A8me_g%C3%A9n%C3%A9ration" title="Catégorie:Pokémon de la troisième génération">Pokémon de la troisième génération</a></li></ul>';
    const extractHtml = new ExtractHtml(307);
    const result = extractHtml.extract(html);

    const resultWaiting = '<ul><li><a href="/Cat%C3%A9gorie:Liste_de_Pok%C3%A9mon" title="Catégorie:Liste de Pokémon">Liste de Pokémon</a></li><li><a href="/Cat%C3%A9gorie:Pok%C3%A9mon_de_la_troisi%C3%A8me_g%C3%A9n%C3%A9ration" title="Catégorie:Pokémon de la troisième génération">Pokémon de la troisième génération</a></li></ul>';
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

