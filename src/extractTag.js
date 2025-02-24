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
        let recordingOpenTag = true;
        let content = '';
        for(let i = 0; i < html.length; i ++){
            const caracter = html[i];
            if(!recordingOpenTag){
                const closedTagFind = this.identifyIfClosedTag(html, i);
                if(closedTagFind)
                    break;
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
        const tags = [];
        tags.push(tagBuild);
        return tags;
    }

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