import Dom from "../src/dom";
import {jest} from '@jest/globals';

test('Build Dom simple html', ()=>{
    const html = '<h1 class="firstHeading mw-first-heading"><span class="mw-page-title-main">Liste des Pokémon de la première génération</span></h1>';

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'h1', content: '<span class="mw-page-title-main">Liste des Pokémon de la première génération</span>', cssClass:'firstHeading mw-first-heading', cssId : '', "contentOnlyText":false},
        {tagName : 'span', content : 'Liste des Pokémon de la première génération', cssClass : 'mw-page-title-main', cssId : '', contentOnlyText:true}];
    expect(CompareTagObject(expected,result)).toBe(true);
});

//tester avec plein de niveaux
test('Build Dom many levels html', ()=>{
    const html = '<li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li>';

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'li', cssClass : 'user-links-collapsible-item mw-list-item', cssId : 'pt-createaccount', contentOnlyText : false, content:'<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a>'},
        {tagName : 'a', cssClass : '', cssId : '', contentOnlyText : false, content:'<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>'},
        {tagName : 'span', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true, content:''},
        {tagName : 'span', cssClass:'', cssId:'', contentOnlyText : true, content:'Créer un compte'}];
    expect(CompareTagObject(expected,result)).toBe(true);
});


test('Build Dom many more levels html', ()=>{
    const html = '<div class="vector-menu-content"><ul class="vector-menu-content-list"><li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li></ul></div>';

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'div', cssClass : 'vector-menu-content', cssId : '', contentOnlyText : false, content:'<ul class="vector-menu-content-list"><li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li></ul>'},
        {tagName : 'ul', cssClass : 'vector-menu-content-list', cssId : '', contentOnlyText : false, content:'<li id="pt-createaccount" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a></li><li id="pt-login" class="user-links-collapsible-item mw-list-item"><a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a></li>'},
        {tagName : 'li', cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-createaccount', contentOnlyText : false, content:'<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a>'},
        {tagName : 'a', cssClass : '', cssId : '', contentOnlyText : false, content:'<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>'},
        {tagName : 'span', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true, content:''},
        {tagName : 'span', cssClass:'', cssId:'', contentOnlyText : true, content:'Créer un compte'},
        {tagName : 'li', cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-login', contentOnlyText : false, content:'<a href="/index.php?title=Sp%C3%A9cial:Connexion&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à vous connecter ; ce n’est cependant pas obligatoire. [o]" accesskey="o"><span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span></a>'},
        {tagName : 'a', cssClass : '', cssId : '', contentOnlyText : false, content : '<span class="vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn"></span><span>Se connecter</span>'},
        {tagName : 'span', cssClass:'vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn', cssId: '', contentOnlyText : true, content:''},
        {tagName : 'span', cssClass:'', cssId:'', contentOnlyText : true, content:'Se connecter'}];
    expect(CompareTagObject(expected,result)).toBe(true);
});


test('Build Dom starting with forbidden tag', ()=>{
    const html = '<input type="checkbox" id="vector-main-menu-dropdown-checkbox" role="button" aria-haspopup="true" data-event-name="ui.dropdown-vector-main-menu-dropdown" class="vector-dropdown-checkbox" aria-label="Menu principal"><label id="vector-main-menu-dropdown-label" for="vector-main-menu-dropdown-checkbox" class="vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only" aria-hidden="true"><span class="vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu"></span><span class="vector-dropdown-label-text">Menu principal</span></label>';

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'label', content: '<span class="vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu"></span><span class="vector-dropdown-label-text">Menu principal</span>', 
        cssClass:'vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only', cssId : 'vector-main-menu-dropdown-label', "contentOnlyText":false}, 
        {tagName : 'span', content :'', cssClass : 'vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu', cssId : '', "contentOnlyText":true}, {tagName : 'span', content :'Menu principal', 
        cssClass : 'vector-dropdown-label-text', cssId : '', "contentOnlyText":true}];
    expect(CompareTagObject(expected,result)).toBe(true);
})

test('Build Dom with a forbidden tag inside div', ()=>{
    const html = '<div class="cdx-text-input cdx-text-input--has-start-icon"><input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput"><span class="cdx-text-input__icon cdx-text-input__start-icon"></span></div>';

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'div', content: '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput"><span class="cdx-text-input__icon cdx-text-input__start-icon"></span>', 
        cssClass:'cdx-text-input cdx-text-input--has-start-icon', cssId : '', contentOnlyText:false}, {tagName : 'span', content :'', cssClass : 'cdx-text-input__icon cdx-text-input__start-icon', cssId : '', contentOnlyText:true}];
    expect(CompareTagObject(expected,result)).toBe(true);
})


const CompareTagObject = (firstTags, secondTags)=>{
    if(firstTags.length !== secondTags.length)
        return false;
    else{
        for(let i = 0; i < firstTags.length; i ++){
            const firstTag = firstTags[i];
            const secondTag = secondTags[i];
            const isTagNameEqual = firstTag.tagName === secondTag.tagName;
            const isCssClassEqual = firstTag.cssClass === secondTag.cssClass;
            const isCssIdEqual = firstTag.cssId === secondTag.cssId;
            const contentOnlyTextEqual = firstTag.contentOnlyText === secondTag.contentOnlyText;
            const contentEqual = firstTag.content === secondTag.content;
            const tagsAreEqual = isTagNameEqual && isCssClassEqual && isCssIdEqual && contentOnlyTextEqual && contentEqual;
            if(!tagsAreEqual)
                return false;
            else 
                return true;
        }
    }
    return true;
}