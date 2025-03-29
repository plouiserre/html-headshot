import ExtractAllTags from "../../src/extract/extractAllTags";

// //TODO ajouter un test ultra complexe en one shot

test('can analyze two tags following each other', ()=>{
    const html = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>';
    const extractAllTags = new ExtractAllTags();
    const result = extractAllTags.extract(html);

    const resultWaiting = ['<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span>','<span>Créer un compte</span>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('can extract only good tag(s) and refuse forbidden tag',()=>{
    const html = '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput"><span class="cdx-text-input__icon cdx-text-input__start-icon"></span>';
    const extractAllTags = new ExtractAllTags();
    const result = extractAllTags.extract(html);

    const resultWaiting = ['<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('can extract complexs divs with many many levels',()=>{
    const html = '<div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li></ul></div>';
    const extractAllTags = new ExtractAllTags();
    const result = extractAllTags.extract(html);

    const resultWaiting = ['<div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li></ul></div>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('can extract two complexs divs with many many levels',()=>{
    const html = '<div class="vector-menu-heading">Navigation</div><div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="n-mainpage-description" class="mw-list-item"><a href="/Portail:Accueil" title="Accueil général [z]" accesskey="z"><span>Accueil</span></a></li><li id="n-randompage" class="mw-list-item"><a href="/Sp%C3%A9cial:Page_au_hasard" title="Afficher une page au hasard [x]" accesskey="x"><span>Page au hasard</span></a></li><li id="n-forum" class="mw-list-item"><a href="https://forum.pokepedia.fr"><span>Forum</span></a></li><li id="n-discord" class="mw-list-item"><a href="https://discord.gg/ApHjgNHTmn"><span>Discord</span></a></li><li id="n-help" class="mw-list-item"><a href="/Aide:Sommaire" title="Accès à l’aide"><span>Aide</span></a></li></ul></div>';
    const extractAllTags = new ExtractAllTags();
    const result = extractAllTags.extract(html);

    const resultWaiting = ['<div class="vector-menu-heading">Navigation</div>','<div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="n-mainpage-description" class="mw-list-item"><a href="/Portail:Accueil" title="Accueil général [z]" accesskey="z"><span>Accueil</span></a></li><li id="n-randompage" class="mw-list-item"><a href="/Sp%C3%A9cial:Page_au_hasard" title="Afficher une page au hasard [x]" accesskey="x"><span>Page au hasard</span></a></li><li id="n-forum" class="mw-list-item"><a href="https://forum.pokepedia.fr"><span>Forum</span></a></li><li id="n-discord" class="mw-list-item"><a href="https://discord.gg/ApHjgNHTmn"><span>Discord</span></a></li><li id="n-help" class="mw-list-item"><a href="/Aide:Sommaire" title="Accès à l’aide"><span>Aide</span></a></li></ul></div>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('extract tags when it is finished by a space',()=>{
    const html = '<div class="mw-page-container-inner"><div class="vector-sitenotice-container"><div id="siteNotice"></div></div><div class="vector-column-start"><div class="vector-main-menu-container"><div id="mw-navigation"><nav id="mw-panel" class="vector-main-menu-landmark" aria-label="Site"><div id="vector-main-menu-pinned-container" class="vector-pinned-container"></div></nav></div></div></div><div class="mw-content-container"><main id="content" class="mw-body"><header class="mw-body-header vector-page-tit…abled"><img src="/resources/assets/poweredby_mediawiki.svg" alt="Powered by MediaWiki" width="88" height="31" loading="lazy"></a><a href="https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki" class="cdx-button cdx-button--fake-button cdx-button--size-large cdx-button--fake-button--enabled"><img src="/extensions/SemanticMediaWiki/res/smw/assets/logo_footer.svg" alt="Powered by Semantic MediaWiki" class="smw-footer" width="88" height="31" loading="lazy"></a></li></ul></footer></div></div> ';
    const extractAllTags = new ExtractAllTags();
    const result = extractAllTags.extract(html);

    const resultWaiting = ['<div class="mw-page-container-inner"><div class="vector-sitenotice-container"><div id="siteNotice"></div></div><div class="vector-column-start"><div class="vector-main-menu-container"><div id="mw-navigation"><nav id="mw-panel" class="vector-main-menu-landmark" aria-label="Site"><div id="vector-main-menu-pinned-container" class="vector-pinned-container"></div></nav></div></div></div><div class="mw-content-container"><main id="content" class="mw-body"><header class="mw-body-header vector-page-tit…abled"><img src="/resources/assets/poweredby_mediawiki.svg" alt="Powered by MediaWiki" width="88" height="31" loading="lazy"></a><a href="https://www.semantic-mediawiki.org/wiki/Semantic_MediaWiki" class="cdx-button cdx-button--fake-button cdx-button--size-large cdx-button--fake-button--enabled"><img src="/extensions/SemanticMediaWiki/res/smw/assets/logo_footer.svg" alt="Powered by Semantic MediaWiki" class="smw-footer" width="88" height="31" loading="lazy"></a></li></ul></footer></div></div>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('when no ending tags an response empty send', ()=>{
    const html = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><script>(function(){var className="client-js vector-feature-language-in-header';
    const extractAllTags = new ExtractAllTags();
    
    expect(()=>extractAllTags.extract(html)).toThrow("La balise script ne se ferme pas!!!");
});

test('when brackets are presents and for the selection', ()=>{
    const html = '<i><a href="/Liste_des_Pok%C3%A9mon_recrutables_de_Pok%C3%A9mon_Caf%C3%A9_ReMix" title="Liste des Pokémon recrutables de Pokémon Café ReMix">Café ReMix</a></i> (<a href="/Liste_des_Pok%C3%A9mon_recrutables_de_Pok%C3%A9mon_Caf%C3%A9_ReMix/1.110.0" title="Liste des Pokémon recrutables de Pokémon Café ReMix/1.110.0">1.110.0</a>)';
    const extractAllTags = new ExtractAllTags();
    const result = extractAllTags.extract(html);

    const resultWaiting = ['<i><a href="/Liste_des_Pok%C3%A9mon_recrutables_de_Pok%C3%A9mon_Caf%C3%A9_ReMix" title="Liste des Pokémon recrutables de Pokémon Café ReMix">Café ReMix</a></i>','<a href="/Liste_des_Pok%C3%A9mon_recrutables_de_Pok%C3%A9mon_Caf%C3%A9_ReMix/1.110.0" title="Liste des Pokémon recrutables de Pokémon Café ReMix/1.110.0">1.110.0</a>'];
    expect(compareTwoArrays(result, resultWaiting)).toBe(true);
});

test('get tags when forbidden tags are followed by blank space', ()=>{
    const html = '<div class="cdx-text-input cdx-text-input--has-start-icon"> <input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput" > <span class="cdx-text-input__icon cdx-text-input__start-icon"></span> </div> <input type="hidden" name="title" value="Spécial:Recherche"> ';
    const extractAllTags = new ExtractAllTags();
    const result = extractAllTags.extract(html);

    const resultWaiting = ['<div class="cdx-text-input cdx-text-input--has-start-icon"> <input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput" > <span class="cdx-text-input__icon cdx-text-input__start-icon"></span> </div>'];
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