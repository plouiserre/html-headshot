export default class ExtractTag{
    
    constructor(){
        this.indexEnd = 0;
        this.openTag = '';
        this.simpleOpenTag = '';
        this.closedTag = '';
        this.deleteAllRest = false;
        this.forbiddenTag = ['!DOCTYPE', 'meta','link', 'input', 'img'];
    }

    extract = (html)=>{
        this.searchTagOpen(html);
        this.constructOpenTag();
        const forbiddenTag = this.identifyForbiddenTag();
        if(forbiddenTag){
            const tag = {html : this.openTag, extraction : false, simpleTag : this.simpleOpenTag};
            return tag;
        }
        else{
            this.searchTagClosed(html);
            const tagHtml = this.extractHtml(html);
            const tag = {html :tagHtml, extraction : tagHtml ===''? false : true, simpleTag : this.simpleOpenTag, deleteAllRest : this.deleteAllRest };
            return tag;
        }
    }

    constructOpenTag=()=>{
        this.simpleOpenTag = this.openTag.replace('<','').split(' ')[0].replace('>','');
    }

    searchTagOpen = (html)=>{
        let startSaveOpenTag = false;
        for(let i = 0; i < html.length; i ++){
            const caracter = html[i];
            if(caracter=='<')
                startSaveOpenTag = true;
            if(startSaveOpenTag){
                this.openTag += caracter;
                if(caracter == '>')
                    break;
            }
        }
    }

    identifyForbiddenTag = ()=>{
        return this.forbiddenTag.includes(this.simpleOpenTag);
    }

    searchTagClosed = (html)=>{
        let openTagTime = 0;
        this.constructClosedTag();
        const openTagBase = this.getOpenBaseTag();
        for(let i = 0; i < html.length; i ++){
            const closedTagPossible = html.substring(i, i + this.closedTag.length);
            const openTagPossible = html.substring(i, i+openTagBase.length);
            if(closedTagPossible === this.closedTag && openTagTime == 1){
                this.indexEnd = i + this.closedTag.length;
                break;
            } 
            else if(closedTagPossible === this.closedTag){
                openTagTime -=1;
            }
            else if(openTagPossible === openTagBase){
                openTagTime +=1;
            }
        }
    }

    extractHtml = (html)=>{
        const startTag = this.determineIfBracketFirstImportantElement(html);
        if(!startTag.isBracket){
            const tag = html.substring(0, this.indexEnd);
            return tag;
        }
        else{
            const tag = html.substring(startTag.elementStarting, this.indexEnd);
            return tag;
        }
    }

    determineIfBracketFirstImportantElement = (html) =>{
        let isBracket = false;
        let elementStarting = 0;
        for(let i = 0; i < html.length; i++){
            const firstCaracter = html[i];
            if(firstCaracter == ' '){
                continue;
            }
            else{
                if(firstCaracter == '('){
                    isBracket = true;
                    elementStarting = i + 1;
                    this.deleteAllRest = true;
                }
                return { isBracket : isBracket, elementStarting : elementStarting};
            }
        }
    }

    constructClosedTag = ()=>{
        const simpleOpenTag = this.openTag.replace('<','').split(' ')[0].replace('>','');
        this.closedTag = '</'+simpleOpenTag+'>';
    }

    getOpenBaseTag = ()=>{
        return this.closedTag.replace('</','<').replace('>','');
    }
}