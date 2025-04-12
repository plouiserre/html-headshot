import RequestFather from "../../src/request/requestFather.js";

//TODO centralisé le test
    const spanUserAdd = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span>';
    const spanCreateAccount = '<span>Créer un compte</span>';
    const aCreateAccount = `<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire.">${spanUserAdd}${spanCreateAccount}</a>`;
    const liCreateAccount = `<li id="pt-createaccount" class="user-links-collapsible-item mw-list-item">${aCreateAccount}</li>`;
    const spanLogin = '<span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span>'
    const spanLoginLabel = '<span>Se connecter</span>';
    const aLogin = `<a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o">${spanLogin}${spanLoginLabel}</a>`;
    const liLogin = `<li id="pt-login" class="user-links-collapsible-item mw-list-item">${aLogin}</li>`;
    const ulTag = `<ul class="vector-menu-content-list">${liCreateAccount}${liLogin}</ul>`;
    const html = `<div class="vector-menu-content">${ulTag}</div>`;
    const domResults = [{tagName : 'div', completeTag : html, parentTag : '' ,content:'<ul class="vector-menu-content-list"><li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li></ul>', cssClass : 'vector-menu-content', cssId : '', contentOnlyText : false},
        {tagName : 'ul', completeTag : ulTag, parentTag : html, content:'<li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li>', cssClass : 'vector-menu-content-list', cssId : '', contentOnlyText : false},
        {tagName : 'li', completeTag : liCreateAccount, parentTag : ulTag, content:'<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a>', cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-createaccount', contentOnlyText : false},
        {tagName : 'li', completeTag : liLogin, parentTag : ulTag, content:'<a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a>', cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-login', contentOnlyText : false},
        {tagName : 'a', completeTag : aLogin, parentTag : liLogin, content : '<span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span>', cssClass : '', cssId : '', contentOnlyText : false},
        {tagName : 'span', completeTag: spanLogin, parentTag : aLogin, content:'', cssClass:'vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : spanLoginLabel, parentTag : aLogin, content:'Se connecter', cssClass:'', cssId:'', contentOnlyText : true},
        {tagName : 'a',  completeTag : aCreateAccount, parentTag : liCreateAccount, content:'<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>', cssClass : '', cssId : '', contentOnlyText : false},
        {tagName : 'span', completeTag : spanUserAdd, parentTag : aCreateAccount, content:'', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : spanCreateAccount, parentTag : aCreateAccount, content:'Créer un compte', cssClass:'', cssId:'', contentOnlyText : true}];

test('Find father element', ()=>{
    
    const requestFather = new RequestFather(domResults);

    const father = requestFather.findFather(html);

    const expected = {tagName : 'div', completeTag : html, parentTag : '' ,content:'<ul class="vector-menu-content-list"><li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li></ul>', cssClass : 'vector-menu-content', cssId : '', contentOnlyText : false};
    expect(CompareTagObject(expected,father)).toBe(true);
});

test('Find father element impossible', ()=>{
    const requestFather = new RequestFather(domResults);

    expect(()=>requestFather.findFather('<body>New page with no tags</body>')).toThrow("Impossible de trouver la balise <body>New page with no tags</body> comme balise père");
});

CompareTagObject = (expected, result)=>{
    const expectStringify = JSON.stringify(expected);
    const resultStringify = JSON.stringify(result);
    const tagsAreEqual = expectStringify === resultStringify;
    if(tagsAreEqual)
        return true;
    else
        return false;
}