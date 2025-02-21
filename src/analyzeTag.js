//Maybe in the futur I will do not need some of properties in the final object
export default class AnalyzeTag{
    constructor(){
        this.allHtml = '';
        this.openTag = '';
        this.closeTag = '';
        this.content = '';
        this.tag = '';
        this.cssClass = '';
        this.cssId = '';
        this.contentOnlyText = true;
        this.analyze = {};
    }

    analyzeData = (html)=>{
        this.allHtml = html;
        this.determinateOpenTag();
        this.determinateTag();
        this.determinateCloseTag();
        this.determinateContent();
        this.determinateCssClass();
        this.determinateIdCss();
        this.constructAnalyze();
        return this.analyze;
    }
    
    determinateOpenTag = ()=>{
        for(let i = 0; i < this.allHtml.length; i ++){
            const content = this.allHtml[i];
            if(content == '>' && this.openTag == ''){
                this.openTag = this.allHtml.substring(0, i)+content;
            }
        }
    };
    
    determinateTag = ()=>{
        const isComplexTag = this.openTag.includes('<');
        if(isComplexTag){
                const startTag = this.openTag.split(' ')[0];
                this.tag = startTag.replace('<','').replace('>', '');
            }
        else
            this.tag = this.openTag.replace('<','').replace('>', '');
    }
    
    determinateCloseTag = ()=>{
        this.closeTag = '</'+this.tag+'>';
    }
    
    determinateContent = ()=>{
        this.content = this.allHtml.replace(this.openTag,'').replace(this.closeTag,'');
        if(this.content.includes('<'))
            this.contentOnlyText = false;
    }
    
    //TODO improve this code
    determinateCssClass = ()=>{
        this.cssClass = '';
        const classAttribut = 'class="';
        let recordingCssClass = false;
        let indexRecording = 0;
        let quoteNumber = 0;
        for(let i = 0; i < this.openTag.length; i ++){
            const content = this.openTag[i];
            if(!recordingCssClass){
                const classAttributCandidate = this.openTag.substring(i, i+classAttribut.length);
                if(classAttributCandidate===classAttribut){
                    recordingCssClass = true;
                    indexRecording = i + classAttribut.length;
                }
            }
            else if (content == '"' && quoteNumber == 1){
                break;
            }
            else if (content == '"'){
                quoteNumber +=1;
                continue;
            }
            else if (i >= indexRecording){
                this.cssClass += content;
            }
        }
    }

    //TODO improve this code
    determinateIdCss = () => {
        this.cssId = '';
        const classAttribut = 'id="';
        let recordingCssId = false;
        let indexRecording = 0;
        for(let i = 0; i < this.openTag.length; i ++){
            const content = this.openTag[i];
                if(!recordingCssId){
                const classAttributCandidate = this.openTag.substring(i, i+classAttribut.length);
                if(classAttributCandidate===classAttribut){
                    recordingCssId = true;
                    indexRecording = i + classAttribut.length;
                }
            }
            else if (content == '"'){
                continue;
            }
            else if (content == '>' || content == ' '){
                break;
            }
            else if (i >= indexRecording){
                this.cssId += content;
            }
        }
    }
    
    constructAnalyze=()=>{
        this.analyze = {
            tagName : this.tag,
            content : this.content,
            cssClass : this.cssClass,
            cssId : this.cssId,
            contentOnlyText : this.contentOnlyText
        };
    }
}