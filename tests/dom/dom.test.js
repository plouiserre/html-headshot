import Dom from '../../src/dom/dom.js';
import {jest} from '@jest/globals';
import { GetDomResults, GetHtmlData } from '../utils/data.js';
import { CompareTagArrays } from '../utils/compare.js';

test('Build Dom simple html', ()=>{
    const subTag = '<span class="mw-page-title-main">Liste des Pokémon de la première génération</span>';
    const html = `<h1 class="firstHeading mw-first-heading">${subTag}</h1>`;

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'h1', completeTag : html,  parentTag : '', content: '<span class="mw-page-title-main">Liste des Pokémon de la première génération</span>', cssClass:'firstHeading mw-first-heading', cssId : '', "contentOnlyText":false},
        {tagName : 'span', completeTag : subTag, parentTag : html, content : 'Liste des Pokémon de la première génération', cssClass : 'mw-page-title-main', cssId : '', contentOnlyText:true}];
    expect(CompareTagArrays(expected,result)).toBe(true);
});

test('Build Dom many levels html', ()=>{
    const firstSpan = '<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span>';
    const secondSpan = '<span>Créer un compte</span>';
    const aLink = `<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire.">${firstSpan}${secondSpan}</a>`;
    const html = `<li id="pt-createaccount" class="user-links-collapsible-item mw-list-item">${aLink}</li>`;

    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'li', completeTag : html, parentTag : '' , content:'<a href="/index.php?title=Sp%C3%A9cial:Cr%C3%A9er_un_compte&amp;returnto=Liste+des+Pok%C3%A9mon+de+la+premi%C3%A8re+g%C3%A9n%C3%A9ration" title="Nous vous encourageons à créer un compte utilisateur et vous connecter ; ce n’est cependant pas obligatoire."><span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span></a>', cssClass : 'user-links-collapsible-item mw-list-item', cssId : 'pt-createaccount', contentOnlyText : false},
        {tagName : 'a', completeTag : aLink, parentTag : html, content:'<span class="vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd"></span><span>Créer un compte</span>', cssClass : '', cssId : '', contentOnlyText : false},
        {tagName : 'span', completeTag :  firstSpan, parentTag : aLink, content:'', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true},
        {tagName : 'span', completeTag : secondSpan, parentTag : aLink, content:'Créer un compte', cssClass:'', cssId:'', contentOnlyText : true}];
    expect(CompareTagArrays(expected,result)).toBe(true);
});


test('Build Dom many more levels html', ()=>{
    const html = GetHtmlData('html');
    
    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);
    
    const expected = GetDomResults();
    expect(CompareTagArrays(expected,result)).toBe(true);
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

    const expected = [{tagName : 'label', completeTag : label, parentTag : '', content: '<span class="vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu"></span><span class="vector-dropdown-label-text">Menu principal</span>', 
        cssClass:'vector-dropdown-label cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only', cssId : 'vector-main-menu-dropdown-label', "contentOnlyText":false}, 
        {tagName : 'span', completeTag : spanIcon, parentTag : label, content :'', cssClass : 'vector-icon mw-ui-icon-menu mw-ui-icon-wikimedia-menu', cssId : '', "contentOnlyText":true}, 
        {tagName : 'span', completeTag : spanLabel, parentTag : label, content :'Menu principal', cssClass : 'vector-dropdown-label-text', cssId : '', "contentOnlyText":true}];
    expect(CompareTagArrays(expected,result)).toBe(true);
})

test('Build Dom with a forbidden tag inside div', ()=>{
    const input = '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput">';
    const span = '<span class="cdx-text-input__icon cdx-text-input__start-icon"></span>';
    const html = `<div class="cdx-text-input cdx-text-input--has-start-icon">${input}${span}</div>`;
    
    const mockDependency = { write : jest.fn()};
    const dom = new Dom(mockDependency);
    const result = dom.buildDom(html);

    const expected = [{tagName : 'div', completeTag : html, parentTag : '', content: '<input class="cdx-text-input__input" type="search" name="search" placeholder="Rechercher sur Poképédia" aria-label="Rechercher sur Poképédia" autocapitalize="sentences" title="Rechercher sur Poképédia [f]" accesskey="f" id="searchInput"><span class="cdx-text-input__icon cdx-text-input__start-icon"></span>', cssClass:'cdx-text-input cdx-text-input--has-start-icon', cssId : '', contentOnlyText:false}, 
        {tagName : 'span', completeTag : span, parentTag : html, content :'', cssClass : 'cdx-text-input__icon cdx-text-input__start-icon', cssId : '', contentOnlyText:true}];
    expect(CompareTagArrays(expected,result)).toBe(true);
})