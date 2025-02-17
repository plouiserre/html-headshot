export function discoverTag(html){
    let isSavingHtml = false;
    let tagDiscovering = '';
    let allTags = [];
    for (var i = 0; i < html.length; i ++){  
        const caractere = html[i];
        if(caractere == '<'){
            isSavingHtml = true;
            tagDiscovering += caractere;
        }
        else if(isSavingHtml){
            tagDiscovering += caractere;
        }
        if(caractere == '>'){
            isSavingHtml = false;
            const tagClean = getTagClean(tagDiscovering);
            const isStartTag = analyzedIfStartTag(tagClean);
            if(isStartTag)
                allTags.push(tagClean);
            tagDiscovering = '';
        }
    }
    return allTags;
}

//if the file is too long externalize the next to function in a separate file
function getTagClean(tag){
    let tagClean = '';
    for (var i = 0; i < tag.length; i ++){ 
        const caractere = tag[i];
        if(caractere!= ' ' && caractere != '<' && caractere != '>')
            tagClean+=caractere;
        else if(caractere == '<' || caractere == '>')
            continue
        else 
            break;
    }
    return tagClean;
}

function analyzedIfStartTag(tag){
    let isStartTag = true;
    for (var i = 0; i < tag.length; i ++){ 
        const caractere = tag[i];
        if(caractere== '/'){
            isStartTag= false;
            break;
        }
    }
    return isStartTag;
}