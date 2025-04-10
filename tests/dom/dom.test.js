import Dom from '../../src/dom/dom.js';
import {jest} from '@jest/globals';

test('Build Dom simple html', ()=>{
    const subTag = '<span class="mw-page-title-main">Liste des Pokémon de la première génération</span>';
    const html = `<h1 class="firstHeading mw-first-heading">${subTag}</h1>`;

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'h1', completeTag : html,  content: '<span class="mw-page-title-main">Liste des Pokémon de la première génération</span>', cssClass:'firstHeading mw-first-heading', cssId : '', "contentOnlyText":false},
        {tagName : 'span', completeTag : subTag, content : 'Liste des Pokémon de la première génération', cssClass : 'mw-page-title-main', cssId : '', contentOnlyText:true}];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Build Dom many levels html', ()=>{
    const firstSpan = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span>';
    const secondSpan = '<span>Créer un compte</span>';
    const aLink = `<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire.">${firstSpan}${secondSpan}</a>`;
    const html = `<li id="pt-createaccount" class="user-links-collapsible-item mw-list-item">${aLink}</li>`;

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'li', completeTag : html, content:'<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a>', cssClass : 'user-links-collapsible-item mw-list-item', cssId : 'pt-createaccount', contentOnlyText : false},
        {tagName : 'a', completeTag : aLink, content:'<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>', cssClass : '', cssId : '', contentOnlyText : false},
        {tagName : 'span', completeTag :  firstSpan, content:'', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : secondSpan, content:'Créer un compte', cssClass:'', cssId:'', contentOnlyText : true}];
    expect(CompareTagObject(expected,result)).toBe(true);
});


test('Build Dom many more levels html', ()=>{
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
    
    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'div', completeTag : html, content:'<ul class="vector-menu-content-list"><li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li></ul>', cssClass : 'vector-menu-content', cssId : '', contentOnlyText : false},
        {tagName : 'ul', completeTag : ulTag, content:'<li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li>', cssClass : 'vector-menu-content-list', cssId : '', contentOnlyText : false},
        {tagName : 'li', completeTag : liCreateAccount, content:'<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a>', cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-createaccount', contentOnlyText : false},
        {tagName : 'li', completeTag : liLogin, content:'<a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a>', cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-login', contentOnlyText : false},
        {tagName : 'a', completeTag : aLogin, content : '<span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span>', cssClass : '', cssId : '', contentOnlyText : false},
        {tagName : 'span', completeTag: spanLogin, content:'', cssClass:'vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : spanLoginLabel, content:'Se connecter', cssClass:'', cssId:'', contentOnlyText : true},
        {tagName : 'a',  completeTag : aCreateAccount, content:'<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>', cssClass : '', cssId : '', contentOnlyText : false},
        {tagName : 'span', completeTag : spanUserAdd, content:'', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : spanCreateAccount, content:'Créer un compte', cssClass:'', cssId:'', contentOnlyText : true}];
    expect(CompareTagObject(expected,result)).toBe(true);
});

test('Build Dom starting with forbidden tag', ()=>{
    const input = '<input type="checkbox" id="vector-main-menu-dropdown-checkbox" role="button" aria-haspopup="true" data-event-name="ui.dropdown-vector-main-menu-dropdown" class="vector-dropdown-checkbox" aria-label="Menu principal">';
    const spanIcon = '<span class="vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu"></span>';
    const spanLabel = '<span class="vector-dropdown-label-text">Menu principal</span>';
    const label = `<label id="vector-main-menu-dropdown-label" for="vector-main-menu-dropdown-checkbox" class="vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" aria-hidden="true">${spanIcon}${spanLabel}</label>`; 
    const html = `${input}${label}`;
    
    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'label', completeTag : label, content: '<span class="vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu"></span><span class="vector-dropdown-label-text">Menu principal</span>', 
        cssClass:'vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only', cssId : 'vector-main-menu-dropdown-label', "contentOnlyText":false}, 
        {tagName : 'span', completeTag : spanIcon, content :'', cssClass : 'vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu', cssId : '', "contentOnlyText":true}, 
        {tagName : 'span', completeTag : spanLabel, content :'Menu principal', cssClass : 'vector-dropdown-label-text', cssId : '', "contentOnlyText":true}];
    expect(CompareTagObject(expected,result)).toBe(true);
})

test('Build Dom with a forbidden tag inside div', ()=>{
    const input = '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput">';
    const span = '<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>';
    const html = `<div class="cdx-text-input cdx-text-input--has-start-icon">${input}${span}</div>`;
    
    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'div', completeTag : html, content: '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput"><span class="cdx-text-input__icon cdx-text-input__start-icon"></span>', cssClass:'cdx-text-input cdx-text-input--has-start-icon', cssId : '', contentOnlyText:false}, 
        {tagName : 'span', completeTag : span, content :'', cssClass : 'cdx-text-input__icon cdx-text-input__start-icon', cssId : '', contentOnlyText:true}];
    expect(CompareTagObject(expected,result)).toBe(true);
})

const CompareTagObject = (firstTags, secondTags)=>{
    if(firstTags.length !== secondTags.length)
        return false;
    else{
        for(let i = 0; i < firstTags.length; i ++){
            const firstTag = firstTags[i];
            const secondTag = secondTags[i];
            const firstTagStringify = JSON.stringify(firstTag);
            const secondTagStringify = JSON.stringify(secondTag);
            const tagsAreEqual = firstTagStringify === secondTagStringify;
            if(!tagsAreEqual)
                return false;
            else
                continue;
        }
    }
    return true;
}