import ExtractTag from "./extractTag.js";

export default class ExtractAllTags{
    constructor(){
        this.isSimpleTag = false;
        this.indexEnd = 0;
        this.openTag = '';
        this.closedTag = '';
        this.isForbiddenTag = false;
        this.forbiddenTag = ['!DOCTYPE', 'meta','link', 'input', 'img'];
    }
    
    extract = (html)=>{
        const tags = [];
        let htmlToAnalyze = html.trimEnd();
        while(htmlToAnalyze!==''){
            const extractTag = new ExtractTag();
            const tag = extractTag.extract(htmlToAnalyze);
            if(tag.extraction && tag.html !=='')
                tags.push(tag.html);
            else if(tag.html ==='')
                throw new Error("La balise "+tag.simpleTag+" ne se ferme pas!!!" );
            htmlToAnalyze = htmlToAnalyze.replace(tag.html, '');
        }
        return tags;
    }

    searchTagOpen = (html)=>{
        for(let i = 0; i < html.length; i ++){
            const caracter = html[i];
            this.openTag += caracter;
            if(caracter == '>')
                break;
        }
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


    deleteHtmlUsed = (html)=>{
        const htmlUsed = html.substring(0, this.indexEnd);
        const htmlFresch = html.replace(htmlUsed, '');
        return htmlFresch;
    }

}