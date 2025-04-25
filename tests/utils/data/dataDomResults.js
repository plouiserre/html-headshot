const GetHtmlData = (key)=>{
    switch(key){
        case 'spanUserAdd':
            return spanUserAdd;
        case 'spanCreateAccount':
            return spanCreateAccount;
        case 'aCreateAccount':
            return aCreateAccount;
        case 'liCreateAccount':
            return liCreateAccount;
        case 'liLogin':
                return liLogin;
        case 'spanLogin':
            return spanLogin;
        case 'spanLoginLabel':
            return spanLoginLabel;
        case 'aLogin':
            return aLogin;
        case 'ulTag':
            return ulTag;
        case 'html':
        default:
            return html;
    }
};

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
const domResults = [{tagName : 'div', completeTag : GetHtmlData('html'), parentTag : '' ,content:GetHtmlData('ulTag'), cssClass : 'vector-menu-content', cssId : '', contentOnlyText : false},
    {tagName : 'ul', completeTag : GetHtmlData('ulTag'), parentTag : GetHtmlData('html'), content:GetHtmlData('liCreateAccount')+GetHtmlData('liLogin'), cssClass : 'vector-menu-content-list', cssId : '', contentOnlyText : false},
    {tagName : 'li', completeTag : GetHtmlData('liCreateAccount'), parentTag : GetHtmlData('ulTag'), content:GetHtmlData('aCreateAccount'), cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-createaccount', contentOnlyText : false},
    {tagName : 'li', completeTag : GetHtmlData('liLogin'), parentTag : GetHtmlData('ulTag'), content:GetHtmlData('aLogin'), cssClass:'user-links-collapsible-item mw-list-item', cssId: 'pt-login', contentOnlyText : false},
    {tagName : 'a', completeTag : GetHtmlData('aLogin'), parentTag : GetHtmlData('liLogin'), content :GetHtmlData('spanLogin')+GetHtmlData('spanLoginLabel'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'span', completeTag: GetHtmlData('spanLogin'), parentTag : GetHtmlData('aLogin'), content:'', cssClass:'vector-icon mw-ui-icon-logIn mw-ui-icon-wikimedia-logIn', cssId: '', contentOnlyText : true},
    {tagName : 'span', completeTag : GetHtmlData('spanLoginLabel'), parentTag : GetHtmlData('aLogin'), content:'Se connecter', cssClass:'', cssId:'', contentOnlyText : true},
    {tagName : 'a',  completeTag : GetHtmlData('aCreateAccount'), parentTag : GetHtmlData('liCreateAccount'), content:GetHtmlData('spanUserAdd')+GetHtmlData('spanCreateAccount'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'span', completeTag : GetHtmlData('spanUserAdd'), parentTag : GetHtmlData('aCreateAccount'), content:'', cssClass:'vector-icon mw-ui-icon-userAdd mw-ui-icon-wikimedia-userAdd', cssId: '', contentOnlyText : true},
    {tagName : 'span', completeTag : GetHtmlData('spanCreateAccount'), parentTag : GetHtmlData('aCreateAccount'), content:'Créer un compte', cssClass:'', cssId:'', contentOnlyText : true}];




const GetDomResults = ()=>{
    return domResults;
};

export {GetDomResults, GetHtmlData}