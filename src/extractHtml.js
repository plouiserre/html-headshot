export default class ExtractHtml{
    constructor(indexEnd){
        this.indexEnd = indexEnd;
        this.html = '';
    }

    extract = (html)=>{
        this.html = html;
        if(this.determineIfBracketStartWithOpenTag()){
            const tag = this.html.substring(0, this.indexEnd);
            return tag;
        }
        else{
            const startIndex = this.determineOpenTagIndex();
            const tag = this.html.substring(startIndex, this.indexEnd);
            return tag;
        }
    }

    determineIfBracketStartWithOpenTag = ()=>{
        return this.html[0] === "<" ? true : false;
    }

    determineOpenTagIndex = ()=>{
        let index = 0;
        for(let i = 0; i < this.html.length; i++){
            const caracter = this.html[i];
            if(caracter === "<"){
                index = i;
                break;
            }
            else 
                continue;
        }
        return index;
    }

}