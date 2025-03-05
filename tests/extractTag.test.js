import ExtractTag from "../src/extractTag";

test('can analyze simple Tag', ()=>{
    const html = '<title>Liste des Pokémon de la première génération — Poképédia</title><script>(function(){var className="client-js vector-feature-language-in-header';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<title>Liste des Pokémon de la première génération — Poképédia</title>', extraction : true, simpleTag: 'title'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});


test('can analyze hard Tag', ()=>{
    const html = '<span class="vector-dropdown-label-text">Menu principal</span> </label>';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<span class="vector-dropdown-label-text">Menu principal</span>', extraction : true, simpleTag: 'span'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('can analyze many Tags', ()=>{
    const html = '<header class="mw-body-header vector-page-titlebar"><h1 id="firstHeading" class="firstHeading mw-first-heading"><span class="mw-page-title-main">Liste des Pokémon de la première génération</span></h1></header> <div class="vector-page-toolbar"> <div class="vector-page';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html :'<header class="mw-body-header vector-page-titlebar"><h1 id="firstHeading" class="firstHeading mw-first-heading"><span class="mw-page-title-main">Liste des Pokémon de la première génération</span></h1></header>', extraction : true, simpleTag: 'header'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});


test('can analyze many same tags and different', ()=>{
    const html = '<div id="p-associated-pages" class="vector-menu vector-menu-tabs mw-portlet mw-portlet-associated-pages"><div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="ca-nstab-main" class="selected vector-tab-noicon mw-list-item"><a href="/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration" title="Voir le contenu de la page [c]" accesskey="c"><span>Page</span></a></li><li id="ca-talk" class="new vector-tab-noicon mw-list-item"><a href="/index.php?title=Discussion:Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration&amp;action=edit&amp;redlink=1" rel="discussion" title="Discussion au sujet de cette page de contenu (page inexistante) [t]" accesskey="t"><span>Discussion</span></a></li></ul></div></div><div id="p-variants" class="vector-dropdown emptyPortlet"><input type="checkbox" ';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<div id="p-associated-pages" class="vector-menu vector-menu-tabs mw-portlet mw-portlet-associated-pages"><div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="ca-nstab-main" class="selected vector-tab-noicon mw-list-item"><a href="/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration" title="Voir le contenu de la page [c]" accesskey="c"><span>Page</span></a></li><li id="ca-talk" class="new vector-tab-noicon mw-list-item"><a href="/index.php?title=Discussion:Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration&amp;action=edit&amp;redlink=1" rel="discussion" title="Discussion au sujet de cette page de contenu (page inexistante) [t]" accesskey="t"><span>Discussion</span></a></li></ul></div></div>', extraction : true, simpleTag: 'div'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('can analyze many same tags and different with many levels', ()=>{
    const html = '<div id="p-variants" class="vector-dropdown emptyPortlet"><input type="checkbox" id="p-variants-checkbox" role="button" aria-haspopup="true" data-event-name="ui.dropdown-p-variants" class="vector-dropdown-checkbox" aria-label="Modifier la variante de langue"><label id="p-variants-label" for="p-variants-checkbox" class="vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet" aria-hidden="true"><span class="vector-dropdown-label-text">français</span></label><div class="vector-dropdown-content"><div id="p-variants" class="vector-menu mw-portlet mw-portlet-variants emptyPortlet"><div class="vector-menu-content"><ul class="vector-menu-content-list"></ul></div></div></div></div><div id="p-lang-btn" class="vector-dropdown mw-portlet mw-portlet-lang"';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<div id="p-variants" class="vector-dropdown emptyPortlet"><input type="checkbox" id="p-variants-checkbox" role="button" aria-haspopup="true" data-event-name="ui.dropdown-p-variants" class="vector-dropdown-checkbox" aria-label="Modifier la variante de langue"><label id="p-variants-label" for="p-variants-checkbox" class="vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet" aria-hidden="true"><span class="vector-dropdown-label-text">français</span></label><div class="vector-dropdown-content"><div id="p-variants" class="vector-menu mw-portlet mw-portlet-variants emptyPortlet"><div class="vector-menu-content"><ul class="vector-menu-content-list"></ul></div></div></div></div>', extraction : true, simpleTag: 'div'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});

test('extract !DOCTYPE tag',()=>{
    const html = '<!DOCTYPE html><html class="client-nojs vector-feature-language-in-header-enabled vector-feature-language-in-main-page-header-disabled vector-feature-sticky-header-disabled vector-feature-page-tools-pinned-disabled vector-feature-toc-pinned-clientpref-1 vector-feature-main-menu-pinned-disabled vector-feature-limited-width-clientpref-0 vector-feature-limited-width-content-enabled vector-feature-zebra-design-enabled vector-feature-custom-font-size-clientpref-disabled vector-feature-client-preferences-disabled vector-feature-typography-survey-disabled vector-toc-not-available" lang="fr" dir="ltr" version="HTML+RDFa 1.0">';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<!DOCTYPE html>', extraction : false, simpleTag: '!DOCTYPE'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
})

test('extract meta tag',()=>{
    const html = '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.25, maximum-scale=5.0"><link rel="alternate" type="application/rdf+xml" title="Liste des Pokémon de la première génération" href="/index.php?title=Sp%C3%A9cial:Export_RDF/Liste_des_Pok%C3%A9mon_de_la_premi%C3%A8re_g%C3%A9n%C3%A9ration&amp;xmlmime=rdf">';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes, minimum-scale=0.25, maximum-scale=5.0">', extraction : false, simpleTag: 'meta'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
})

test('extract link tag',()=>{
    const html = '<link rel="stylesheet" href="/load.php?lang=fr&amp;modules=site.styles&amp;only=styles&amp;skin=vector-2022"><meta name="generator" content="MediaWiki 1.41.1">';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<link rel="stylesheet" href="/load.php?lang=fr&amp;modules=site.styles&amp;only=styles&amp;skin=vector-2022">', extraction : false, simpleTag: 'link'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
})

test('extract input tag',()=>{
    const html = '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput" > <span class="cdx-text-input__icon cdx-text-input__start-icon"></span>';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput" >', extraction : false, simpleTag: 'input'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
})

test('extract img tag',()=>{
    const html = '<img alt="0001" src="/images/d/db/Miniature_0001_EV.png" decoding="async" width="256" height="256" class="mw-file-element" /></a>';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '<img alt="0001" src="/images/d/db/Miniature_0001_EV.png" decoding="async" width="256" height="256" class="mw-file-element" />', extraction : false, simpleTag: 'img'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
}) 

test('when no ending tags an response empty send', ()=>{
    const html = '<script>(function(){var className="client-js vector-feature-language-in-header';
    const extractTag = new ExtractTag();
    const result = extractTag.extract(html);

    const resultWaiting = {html : '', extraction : false, simpleTag: 'script'};
    expect(JSON.stringify(result)).toBe(JSON.stringify(resultWaiting));
});