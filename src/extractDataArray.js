let optionsExtraction = {};
let balise = '';
let htmlASauvegarde = '';
const contenuColonne = [];
    
export function extractDataArray(html, options){
    optionsExtraction = options;
    for (var i = 0; i < html.length; i ++){    
        analyserLigneTableau(html[i]);
    }
    const htmlNettoye = nettoyerHtmlRecuperer(contenuColonne);
    return htmlNettoye[2];
}

function finDeLigne(html, index){
    const premierCaractere = html[index-3];
    const deuxiemeCaractere = html[index-2];
    const troisiemeCaractere = html[index-1];
    const quatriemeCaractere = html[index];
    const balise = premierCaractere+deuxiemeCaractere+troisiemeCaractere+quatriemeCaractere;
    return balise == '</tr>;'
}

function analyserLigneTableau(caractere){
    balise+= caractere;
    const contiensOuvertureColonne = contiensTableauColonneHtml(balise, '<td');
    const contiensFermetureColonne = contiensTableauColonneHtml(balise, '</td');
    if(contiensOuvertureColonne && ! contiensFermetureColonne){
        htmlASauvegarde += caractere;
    }
    else if(contiensFermetureColonne){
        contenuColonne.push(htmlASauvegarde)
        htmlASauvegarde = '';
        balise = '';
    }
}

function contiensTableauColonneHtml(balise, html){
    return balise.includes(html);
}

function nettoyerHtmlRecuperer(htmlRecupere){
    let baliseOuvrante = '';
    let baliseOuvranteARecupere = true;
    const toutHtmlNettoye = [];
    for(var i = 0; i < htmlRecupere.length ; i++){
        const html = htmlRecupere[i];
        const htmlNettoye = nettoyage(html);
        toutHtmlNettoye.push(htmlNettoye);
    }
    return toutHtmlNettoye;
}

function nettoyage(htmlANettoyer){
    let htmlNettoye = nettoyageEnGardantHtml(htmlANettoyer);
    if(optionsExtraction.uniquementText)
        htmlNettoye = nettoyageEnSupprimantHtml(htmlNettoye);
    return htmlNettoye;
}

function nettoyageEnGardantHtml(htmlANettoyer){
    let baliseOuvrante = '';
    let baliseOuvranteARecupere = true;
    for(var i = 0; i < htmlANettoyer.length ; i++){
        const html = htmlANettoyer[i];
        if(baliseOuvranteARecupere)
            baliseOuvrante += html;
        if(html == '>')
            baliseOuvranteARecupere = false;
    }
    let htmlNettoye  = htmlANettoyer.replace(baliseOuvrante, '');
    htmlNettoye = htmlNettoye.replace('</t','');
    return htmlNettoye;
}

function nettoyageEnSupprimantHtml(htmlANettoyer){
    let textePurifie = '';
    let sauvegarderTextePurifie = false;
    for(var i = 0; i < htmlANettoyer.length ; i++){
        const caractere = htmlANettoyer[i];
        if(i > 1){
            const caracterePrecedent = htmlANettoyer[i-1];
            if(caracterePrecedent == '>' && caractere != '<')
                sauvegarderTextePurifie = true;
            if(sauvegarderTextePurifie && caractere != '<')
                textePurifie += caractere;
            else if(sauvegarderTextePurifie && caractere == '<')
                sauvegarderTextePurifie = false;
        }
    }
    textePurifie = textePurifie == '' ? htmlANettoyer : textePurifie;
    return textePurifie;
}

