let allHtml;
let openTag;
let closeTag; 
let content;
let tag;
let cssClass;
let analyze;

//Maybe in the futur I will do not need some of properties in the final object
//TODO réécrire en mode class et vérifier que l'init se passe bien

export function analyzeTag(html){
   initAllVariables();
    allHtml = html;
    determinateOpenTag();
    determinateTag();
    determinateCloseTag();
    determinateContent();
    determinateCssClass();
    constructAnalyze();
    return analyze;
};

const initAllVariables = ()=>{
    allHtml = '';
    openTag = '';
    closeTag = '';
    content = '';
    tag = '';
    cssClass = '';
    analyze = {};
}

const determinateOpenTag = ()=>{
    for(let i = 0; i < allHtml.length; i ++){
        const content = allHtml[i];
        if(content == '>' && openTag == ''){
            openTag = allHtml.substring(0, i)+content;
        }
    }
};

const determinateTag = ()=>{
    const isComplexTag = openTag.includes('<');
    if(isComplexTag){
            const startTag = openTag.split(' ')[0];
            tag = startTag.replace('<','').replace('>', '');
        }
    else
        tag = openTag.replace('<','').replace('>', '');
}

const determinateCloseTag = ()=>{
    closeTag = '</'+tag+'>';
}

const determinateContent = ()=>{
    content = allHtml.replace(openTag,'').replace(closeTag,'');
}

//TODO improve this code
//faut que je finisse la fin de récupération de la class
const determinateCssClass = ()=>{
    cssClass = '';
    const classAttribut = 'class="';
    let recordingCssClass = false;
    let indexRecording = 0;
    for(let i = 0; i < openTag.length; i ++){
        const content = openTag[i];
            if(!recordingCssClass){
            const classAttributCandidate = openTag.substring(i, i+classAttribut.length);
            if(classAttributCandidate===classAttribut){
                recordingCssClass = true;
                indexRecording = i + classAttribut.length;
            }
        }
        else if (content == '"'){
            continue;
        }
        else if (content == '>'){
            break;
        }
        else if (i >= indexRecording){
            cssClass += content;
        }
    }
}

const constructAnalyze=()=>{
    analyze = {
        tagName : tag,
        content : content,
        cssClass : cssClass
    };
}