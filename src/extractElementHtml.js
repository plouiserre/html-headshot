let tagOpen = '';
let tagClosed = '';
let html = '';
let saveHtml = false;
let stopSaving = false;
let contentHtmlSaved = '';

export function extractElementHtml(fileHtml, tagHtml){
    html = fileHtml;
    tagOpen = constructTagOpen(tagHtml);
    tagClosed = constructTagClosed(tagHtml);
    for (var i = 0; i < html.length; i ++){  
        const caractere = html[i];
        if(tagOpen.length < i){
            const wordStart = getElementToCompareWithTag(i, true);
            const wordEnd = getElementToCompareWithTag(i, false);
            if(wordStart == tagOpen){
                saveHtml = true;
            }
            if(wordEnd == tagClosed){
                break;
            }
            if(saveHtml){
                contentHtmlSaved+=caractere;
            }
        }
    }
    const elementHtml = tagOpen+contentHtmlSaved;
    return elementHtml;
}

function constructTagOpen(tagHtml){
    const tagConstruct = '<'+tagHtml+'>';
    return tagConstruct;
}

function constructTagClosed(tagHtml){
    const tagConstruct = '</'+tagHtml+'>';
    return tagConstruct;
}

function getElementToCompareWithTag(index, isStartTag){
    const length = tagOpen.length;
    const startIndex = isStartTag ? index - length : index - length - 1;
    const word = html.substring(startIndex, index);
    return word;
}