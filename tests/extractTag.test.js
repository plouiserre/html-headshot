import ExtractTag from "../src/extractTag";

test('can analyze simple Tag', ()=>{
    const html = '<title>Liste des Pokémon de la première génération — Poképédia</title><script>(function(){var className="client-js vector-feature-language-in-header';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = ['<title>Liste des Pokémon de la première génération — Poképédia</title>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});


test('can analyze hard Tag', ()=>{
    const html = '<span class="vector-dropdown-label-text">Menu principal</span> </label>';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = ['<span class="vector-dropdown-label-text">Menu principal</span>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('can analyze many Tags', ()=>{
    const html = '<header class="mw-body-header vector-page-titlebar"><h1 id="firstHeading" class="firstHeading mw-first-heading"><span class="mw-page-title-main">Liste des Pokémon de la première génération</span></h1></header> <div class="vector-page-toolbar"> <div class="vector-page';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = ['<header class="mw-body-header vector-page-titlebar"><h1 id="firstHeading" class="firstHeading mw-first-heading"><span class="mw-page-title-main">Liste des Pokémon de la première génération</span></h1></header>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});


test('can analyze many same tags and different', ()=>{
    const html = '<div id="p-associated-pages" class="vector-menu vector-menu-tabs mw-portlet mw-portlet-associated-pages"><div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="ca-nstab-main" class="selected vector-tab-noicon mw-list-item"><a href="/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration" title="Voir le contenu de la page [c]" accesskey="c"><span>Page</span></a></li><li id="ca-talk" class="new vector-tab-noicon mw-list-item"><a href="/index.php?title=Discussion:Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration&amp;action=edit&amp;redlink=1" rel="discussion" title="Discussion au sujet de cette page de contenu (page inexistante) [t]" accesskey="t"><span>Discussion</span></a></li></ul></div></div><div id="p-variants" class="vector-dropdown emptyPortlet"><input type="checkbox" ';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = ['<div id="p-associated-pages" class="vector-menu vector-menu-tabs mw-portlet mw-portlet-associated-pages"><div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="ca-nstab-main" class="selected vector-tab-noicon mw-list-item"><a href="/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration" title="Voir le contenu de la page [c]" accesskey="c"><span>Page</span></a></li><li id="ca-talk" class="new vector-tab-noicon mw-list-item"><a href="/index.php?title=Discussion:Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration&amp;action=edit&amp;redlink=1" rel="discussion" title="Discussion au sujet de cette page de contenu (page inexistante) [t]" accesskey="t"><span>Discussion</span></a></li></ul></div></div>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('can analyze many same tags and different with many levels', ()=>{
    const html = '<div id="p-variants" class="vector-dropdown emptyPortlet"><input type="checkbox" id="p-variants-checkbox" role="button" aria-haspopup="true" data-event-name="ui.dropdown-p-variants" class="vector-dropdown-checkbox" aria-label="Modifier la variante de langue"><label id="p-variants-label" for="p-variants-checkbox" class="vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet" aria-hidden="true"><span class="vector-dropdown-label-text">français</span></label><div class="vector-dropdown-content"><div id="p-variants" class="vector-menu mw-portlet mw-portlet-variants emptyPortlet"><div class="vector-menu-content"><ul class="vector-menu-content-list"></ul></div></div></div></div><div id="p-lang-btn" class="vector-dropdown mw-portlet mw-portlet-lang"';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = ['<div id="p-variants" class="vector-dropdown emptyPortlet"><input type="checkbox" id="p-variants-checkbox" role="button" aria-haspopup="true" data-event-name="ui.dropdown-p-variants" class="vector-dropdown-checkbox" aria-label="Modifier la variante de langue"><label id="p-variants-label" for="p-variants-checkbox" class="vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet" aria-hidden="true"><span class="vector-dropdown-label-text">français</span></label><div class="vector-dropdown-content"><div id="p-variants" class="vector-menu mw-portlet mw-portlet-variants emptyPortlet"><div class="vector-menu-content"><ul class="vector-menu-content-list"></ul></div></div></div></div>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});



test('can analyze two tags following each other', ()=>{
    const html = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>"';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = ['<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span>','<span>Créer un compte</span>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});



const compareTwoArrays = (firstArray, secondArray)=>{
    if(firstArray.length!== secondArray.length)
        return false;
    for(let i = 0; i < firstArray.length; i ++)
    {
        const firstTag = firstArray[i];
        const secondTag = secondArray[i];
        if(firstTag !== secondTag)
            return false;
    }
    return true;
}



test('cannot analyze <!DOCTYPE html> meta link input img tags',()=>{
    const doctype = '<!DOCTYPE html>"';
    const meta = '<meta name="description" content="Cette liste regroupe les Pokémon apparus dans la première génération. Cette génération introduit les Pokémon de Kanto.">';
    const link = '<link rel="alternate" type="application/x-wiki" title="Modifier" href="/index.php?title=Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration&amp;action=edit">';
    const input = '<input type="checkbox" id="vector-main-menu-dropdown-checkbox" role="button" aria-haspopup="true" data-event-name="ui.dropdown-vector-main-menu-dropdown" class="vector-dropdown-checkbox "  aria-label="Menu principal"  >';
    const img = '<img alt="Eau" src="/images/thumb/3/3d/Miniature_Type_Eau_EV.png/80px-Miniature_Type_Eau_EV.png" decoding="async" width="80" height="16" class="mw-file-element" srcset="/images/thumb/3/3d/Miniature_Type_Eau_EV.png/120px-Miniature_Type_Eau_EV.png 1.5x, /images/thumb/3/3d/Miniature_Type_Eau_EV.png/160px-Miniature_Type_Eau_EV.png 2x" />';
    const tags = [doctype, meta, link, input, img];
    for(let i = 0; i < tags.length; i ++ ){
        const extractTag = new ExtractTag();
        const result = extractTag.extract(tags[i]);

        expect(result[0]).toBe(undefined);
    }
})