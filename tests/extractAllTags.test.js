import ExtractAllTags from "../src/extractAllTags";

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



test('when no ending tags an response empty send', ()=>{
    const html = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><script>(function(){var className="client-js vector-feature-language-in-header';
    const extractAllTags = new ExtractAllTags();
    
    expect(()=>extractAllTags.extract(html)).toThrow("La balise script ne se ferme pas!!!");
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