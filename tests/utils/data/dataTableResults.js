GetTableHtml = (key)=>{
    switch(key){
        case 'firstTh' : 
            return firstTh;
        case 'secondTh' :
            return secondTh; 
        case  'thirdTh' : 
            return thirdTh;
        case 'trThead' : 
            return trThead;
        case 'thead' :
            return thead;
        case 'firstLineFirstRow' :
            return firstLineFirstRow;
        case 'aLinkFirstLineSecondRow' : 
            return aLinkFirstLineSecondRow;
        case 'firstLineSecondRow' : 
            return firstLineSecondRow;
        case 'spanTypefirstLineThirdRow' : 
            return spanTypefirstLineThirdRow;
        case 'firstLineThirdRow': 
            return firstLineThirdRow;
        case 'secondLineFirstRow' : 
            return secondLineFirstRow;
        case 'aLinkSecondLineSecondRow' : 
            return aLinksecondLineSecondRow;
        case 'secondLineSecondRow' :
            return secondLineSecondRow;
        case 'spanTypeSecondLineThirdRow' : 
            return spanTypeSecondLineThirdRow;
        case 'secondLineThirdRow' : 
            return secondLineThirdRow;
        case 'thirdLineFirstRow' : 
            return thirdLineFirstRow;
        case 'aLinkThirdLineSecondRow' : 
            return aLinkThirdLineSecondRow;
        case 'thirdLineSecondRow' : 
            return thirdLineSecondRow;
        case 'spanThirdLineThirdRow' : 
                return spanTypeThirdLineThirdRow;
        case 'thirdLineThirdRow' : 
            return thirdLineThirdRow;
        case 'firstLine':
            return firstLine;
        case 'secondLine' : 
            return secondLine;
        case 'thirdLine' : 
            return thirdLine;
        case 'thead' : 
            return thead;
        case 'tbody' : 
            return tbody;
        case 'table' : 
        default : 
            return table;
    }
}

//header
const firstTh = '<th rowspan="2" class="headerSort" tabindex="0" role="columnheader button" title="Tri croissant">Numéro</th>';
const secondTh = '<th rowspan="2" class="headerSort" tabindex="0" role="columnheader button" title="Tri croissant">Nom français</th>';
const thirdTh = '<th rowspan="2" class="headerSort" tabindex="0" role="columnheader button" title="Tri croissant">Types</th>';
const trThead = `<tr>${firstTh}${secondTh}${thirdTh}</tr>`;
const thead = `<thead>${trThead}</thead>`;

//première ligne
const firstLineFirstRow = '<td rowspan="1">0001</td>';
const aLinkFirstLineSecondRow = '<a href="/Bulbizarre" title="Bulbizarre">Bulbizarre</a>';
const firstLineSecondRow = `<td>${aLinkFirstLineSecondRow}</td>`;
const spanTypefirstLineThirdRow = '<span>Plante Poison</span>';
const firstLineThirdRow = `<td>${spanTypefirstLineThirdRow}</td>`;
const firstLine = `<tr>${firstLineFirstRow}${firstLineSecondRow}${firstLineThirdRow}</tr>`;

//deuxième ligne
const secondLineFirstRow = '<td rowspan="1">0002</td>';
const aLinksecondLineSecondRow = '<a href="/Herbizarre" title="Herbizarre">Herbizarre</a>';
const secondLineSecondRow = `<td>${aLinksecondLineSecondRow}</td>`;
const spanTypeSecondLineThirdRow = '<span>Plante Poison</span>';
const secondLineThirdRow = `<td>${spanTypeSecondLineThirdRow}</td>`;
const secondLine = `<tr>${secondLineFirstRow}${secondLineSecondRow}${secondLineThirdRow}</tr>`;

//troisième ligne
const thirdLineFirstRow = '<td rowspan="1">0003</td>';
const aLinkThirdLineSecondRow = '<a href="/Florizarre" title="Florizarre">Florizarre</a>';
const thirdLineSecondRow = `<td>${aLinkThirdLineSecondRow}</td>`;
const spanTypeThirdLineThirdRow = '<span>Plante Poison</span>';
const thirdLineThirdRow = `<td>${spanTypeThirdLineThirdRow}</td>`;
const thirdLine = `<tr>${thirdLineFirstRow}${thirdLineSecondRow}${thirdLineThirdRow}</tr>`;

const tbody = `<tbody>${firstLine}${secondLine}${thirdLine}</tbody>`;
const table = `<table>${thead}${tbody}</tbody>`;

const tableResult = [{tagName : 'table', completeTag : GetTableHtml('table'), parentTag : '', cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'tbody', completeTag : GetTableHtml('tbody'), parentTag : GetTableHtml('table'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'tr', completeTag : GetTableHtml('thirdLine'), parentTag : GetTableHtml('tbody'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'td', completeTag : GetTableHtml('thirdLineFirstRow'), parentTag : GetTableHtml('thirdLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'a', completeTag : GetTableHtml('aLinkThirdLineSecondRow'), parentTag : GetTableHtml('thirdLineSecondRow'), cssClass : '', cssId : '', contentOnlyText : true},
    {tagName : 'td', completeTag : GetTableHtml('thirdLineSecondRow'), parentTag : GetTableHtml('thirdLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'span', completeTag : GetTableHtml('spanTypeThirdLineThirdRow'), parentTag : GetTableHtml('thirdLineThirdRow'), cssClass : '', cssId : '', contentOnlyText : true},
    {tagName : 'td', completeTag : GetTableHtml('thirdLineThirdRow'), parentTag : GetTableHtml('thirdLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'tr', completeTag : GetTableHtml('secondLine'), parentTag : GetTableHtml('tbody'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'td', completeTag : GetTableHtml('secondLineFirstRow'), parentTag : GetTableHtml('secondLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'a', completeTag : GetTableHtml('aLinkSecondLineSecondRow'), parentTag : GetTableHtml('secondLineSecondRow'), cssClass : '', cssId : '', contentOnlyText : true},
    {tagName : 'td', completeTag : GetTableHtml('secondLineSecondRow'), parentTag : GetTableHtml('secondLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'span', completeTag : GetTableHtml('spanTypeSecondLineThirdRow'), parentTag : GetTableHtml('secondLineThirdRow'), cssClass : '', cssId : '', contentOnlyText : true},
    {tagName : 'td', completeTag : GetTableHtml('secondLineThirdRow'), parentTag : GetTableHtml('secondLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'tr', completeTag : GetTableHtml('firstLine'), parentTag : GetTableHtml('tbody'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'td', completeTag : GetTableHtml('firstLineFirstRow'), parentTag : GetTableHtml('firstLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'a', completeTag : GetTableHtml('aLinkFirstLineSecondRow'), parentTag : GetTableHtml('firstLineSecondRow'), cssClass : '', cssId : '', contentOnlyText : true},
    {tagName : 'td', completeTag : GetTableHtml('firstLineSecondRow'), parentTag : GetTableHtml('firstLine'), cssClass : '', cssId : '', contentOnlyText : false},
    {tagName : 'span', completeTag : GetTableHtml('spanTypeFirstLineThirdRow'), parentTag : GetTableHtml('firstLineThirdRow'), cssClass : '', cssId : '', contentOnlyText : true},
    {tagName : 'td', completeTag : GetTableHtml('firstLineThirdRow'), parentTag : GetTableHtml('firstLine'), cssClass : '', cssId : '', contentOnlyText : false}
];

const GetTableResults  = () =>{
    return tableResult;
};

export {GetTableResults}