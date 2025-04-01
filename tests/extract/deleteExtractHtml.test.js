import DeleteExtractHtml from "../../src/extract/deleteExtractHtml";

test('can determine remaining Html when the extraction equal the beginning html', ()=>{
    const html = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>';
    const deleteExtractHtml = new DeleteExtractHtml(html, html);
    const result = deleteExtractHtml.determineHtmlRemaining();

    const resultWaiting = '';
    expect(result).toBe(resultWaiting);
});

test('can determine remaining Html when the extraction is smaller than the beginning html', ()=>{
    const html = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span><b>Attention à bien marquer';
    const extraction = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>';
    const deleteExtractHtml = new DeleteExtractHtml(html, extraction);
    const result = deleteExtractHtml.determineHtmlRemaining();

    const resultWaiting = '<b>Attention à bien marquer';
    expect(result).toBe(resultWaiting);
});

test('can determine remaining Html when the extraction equal the beginning html without the space before', ()=>{
    const html = ' <html class="client-nojs vector-feature-language-in-header-enabled" lang="fr" dir="ltr" version="HTML+RDFa 1.0"><span class="vector-dropdown-label-text">Menu principal</span></html>';
    const extraction = '<html class="client-nojs vector-feature-language-in-header-enabled" lang="fr" dir="ltr" version="HTML+RDFa 1.0"><span class="vector-dropdown-label-text">Menu principal</span></html>';
    const deleteExtractHtml = new DeleteExtractHtml(html, extraction);
    const result = deleteExtractHtml.determineHtmlRemaining();

    const resultWaiting = '';
    expect(result).toBe(resultWaiting);
});

test('can determine remaining Html when the extraction equal the beginning html without the space and : before', ()=>{
    const html = ' : <span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>';
    const extraction = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>';
    const deleteExtractHtml = new DeleteExtractHtml(html, extraction);
    const result = deleteExtractHtml.determineHtmlRemaining();

    const resultWaiting = '';
    expect(result).toBe(resultWaiting);
});

test('can determine remaining Html when the extraction equal the beginning html without the space and : before and tags at this end', ()=>{
    const html = ' : <span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span><b>Attention à bien marquer';
    const extraction = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>';
    const deleteExtractHtml = new DeleteExtractHtml(html, extraction);
    const result = deleteExtractHtml.determineHtmlRemaining();

    const resultWaiting = '<b>Attention à bien marquer';
    expect(result).toBe(resultWaiting);
});

test('can determine no remaining Html when the extraction equal tags between ()', ()=>{
    const html = '(<a href="/Liste_des_Pok%C3%A9mon_recrutables_de_Pok%C3%A9mon_Caf%C3%A9_ReMix/1.110.0" title="Liste des Pokémon recrutables de Pokémon Café ReMix/1.110.0">1.110.0</a>)';
    const extraction = '<a href="/Liste_des_Pok%C3%A9mon_recrutables_de_Pok%C3%A9mon_Caf%C3%A9_ReMix/1.110.0" title="Liste des Pokémon recrutables de Pokémon Café ReMix/1.110.0">1.110.0</a>';
    const deleteExtractHtml = new DeleteExtractHtml(html, extraction);
    const result = deleteExtractHtml.determineHtmlRemaining();

    const resultWaiting = '';
    expect(result).toBe(resultWaiting);
});

test('can determine remaining Html with start with text', ()=>{
    const html = ' Statistiques de base dans les générations:                    <a href="/Liste_des_Pok%C3%A9mon_par_statistiques_de_base_dans_la_huiti%C3%A8me_g%C3%A9n%C3%A9ration" title="Liste des Pokémon par statistiques de base dans la huitième génération">Huitième</a>   <a href="/Liste_des_Pok%C3%A9mon_par_statistiques_de_base_dans_la_neuvi%C3%A8me_g%C3%A9n%C3%A9ration" title="Liste des Pokémon par statistiques de base dans la neuvième génération">Neuvième</a>';
    const extraction = '<a href="/Liste_des_Pok%C3%A9mon_par_statistiques_de_base_dans_la_huiti%C3%A8me_g%C3%A9n%C3%A9ration" title="Liste des Pokémon par statistiques de base dans la huitième génération">Huitième</a>';
    const deleteExtractHtml = new DeleteExtractHtml(html, extraction);
    const result = deleteExtractHtml.determineHtmlRemaining();

    const resultWaiting = '<a href="/Liste_des_Pok%C3%A9mon_par_statistiques_de_base_dans_la_neuvi%C3%A8me_g%C3%A9n%C3%A9ration" title="Liste des Pokémon par statistiques de base dans la neuvième génération">Neuvième</a>';
    expect(result).toBe(resultWaiting);
});
