export default class ExtractTag{
    constructor(){
        this.isSimpleTag = false;
        this.openTag = '';
        this.closedTag = '';
        this.simpleOpenTag = '';
        this.sameOpenTag = 0;
        this.isForbiddenTag = false;
        this.forbiddenTag = ['!DOCTYPE', 'meta','link', 'input', 'img'];
    }
    
    extract = (html)=>{
        let htmlIsNotEmpty = true;
        const tags = [];
        while(htmlIsNotEmpty){
            const extraction = this.searchNextExtraction(html);
            if(extraction.tagComplete)
                tags.push(extraction.tag);
            if(extraction.html.length == 0){
                htmlIsNotEmpty = false;
            }
            else{
                html = extraction.html;
                this.deleteTagsInMemory();
            }
        }
        
        return tags;
    }

    //TODO improve code
    searchNextExtraction = (html)=>{
        let recordingOpenTag = true;
        let content = '';
        let index = 0;
        let tagComplete = false;
        for(let i = 0; i < html.length; i ++){
            index = i;
            const caracter = html[i];
            if(!recordingOpenTag){
                const closedTagFind = this.identifyIfClosedTag(html, i);
                if(closedTagFind){
                    this.isForbiddenTag = false;
                    tagComplete = true;
                    break;
                }
            }
            content += caracter;
            if(recordingOpenTag)
                this.openTag += caracter;
            if(caracter == '>'){
                recordingOpenTag = false;
                this.generateClosedTag();
                this.generateBaseOpenTag();
                if(this.definedIsForbiddenTag())
                {
                    this.isForbiddenTag = true;
                    break;
                }
            }
        }
        const tagBuild = this.isForbiddenTag ? undefined : content + this.closedTag;
        const indexSubstring = this.isForbiddenTag ? index + 1 : index + this.closedTag.length;
        //TODO rework this htmlToAnalyze part
        let htmlToAnalyze = html.substring(indexSubstring, html.length);
        if(htmlToAnalyze=="\"")
            htmlToAnalyze = "";
        return {
            tag : tagBuild,
            html : htmlToAnalyze,
            tagComplete : tagComplete
        };
    };

    deleteTagsInMemory = ()=>{
        this.openTag = '';
        this.closedTag = '';
        this.simpleOpenTag = '';
    };

    identifyIfClosedTag = (html, index)=>{
        const openTagCandidate = html.substring(index, index + this.simpleOpenTag.length);
        const closedTagCandidate = html.substring(index, index+this.closedTag.length);
        if(openTagCandidate === this.simpleOpenTag){
            this.sameOpenTag += 1;
            return false;
        }
        else if(closedTagCandidate === this.closedTag && this.sameOpenTag > 0){
            this.sameOpenTag -=1;
            return false
        }
        else if(closedTagCandidate === this.closedTag && this.sameOpenTag <= 0){
            return true;
        }
    }

    generateClosedTag = () =>{
        const simpleTag = this.openTag.replace('<', '').replace('>','').split(' ')[0];
        this.closedTag = '</'+simpleTag+'>';
    }

    generateBaseOpenTag = () =>{
        this.simpleOpenTag = this.openTag.replace('>','').split(' ')[0];
    }

    definedIsForbiddenTag = ()=>{
        const forbiddenTagCandidate = this.simpleOpenTag.replace('<','');
        return this.forbiddenTag.includes(forbiddenTagCandidate);
    }
}