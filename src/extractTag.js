export default class ExtractTag{
    
    constructor(){
        this.indexEnd = 0;
        this.openTag = '';
        this.simpleOpenTag = '';
        this.closedTag = '';
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
            const tag = {html :tagHtml, extraction : tagHtml ===''? false : true, simpleTag : this.simpleOpenTag };
            return tag;
        }
    }

    constructOpenTag=()=>{
        this.simpleOpenTag = this.openTag.replace('<','').split(' ')[0].replace('>','');
    }

    searchTagOpen = (html)=>{
        for(let i = 0; i < html.length; i ++){
            const caracter = html[i];
            this.openTag += caracter;
            if(caracter == '>')
                break;
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
        const tag = html.substring(0, this.indexEnd);
        return tag;
    }

    constructClosedTag = ()=>{
        const simpleOpenTag = this.openTag.replace('<','').split(' ')[0].replace('>','');
        this.closedTag = '</'+simpleOpenTag+'>';
    }

    getOpenBaseTag = ()=>{
        return this.closedTag.replace('</','<').replace('>','');
    }
}