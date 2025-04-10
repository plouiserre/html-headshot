import DeterminateContent from "./determinateContent.js";

export default class AnalyzeTag{
    constructor(){
        this.allHtml = '';
        this.parentTag = '';
        this.openTag = '';
        this.closeTag = '';
        this.content = '';
        this.tag = '';
        this.cssClass = '';
        this.cssId = '';
        this.contentOnlyText = true;
        this.analyze = {};
    }

    analyzeData = (html, parentTag)=>{
        this.allHtml = html;
        this.parentTag = parentTag;
        this.cleanHtml();
        this.determinateOpenTag();
        this.determinateTag();
        this.determinateCloseTag();
        this.determinateContent();
        this.determinateCssClass();
        this.determinateIdCss();
        this.determineCompleteTag();
        this.constructAnalyze();
        return this.analyze;
    }

    cleanHtml = () => {
        this.allHtml = this.allHtml.trimStart();
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
        const determinateContent = new DeterminateContent(this.openTag, this.closeTag);
        this.content = determinateContent.calculate(this.allHtml);
        this.content = this.content.trimStart();
        if(this.content[0]=='<')
            this.contentOnlyText = false;
    }

    determinateCssClass = () => {
        this.cssClass = this.getAttribute('class');
    }

    determinateIdCss = () => {
        this.cssId = this.getAttribute('id');
    }

    getAttribute = (attribute) => {
        let attributValue = '';
        const classAttribut = `${attribute}="`;
        let recording = false;
        let indexRecording = 0;
        let quoteNumber = 0;
        for(let i = 0; i < this.openTag.length; i ++){
            const content = this.openTag[i];
            if(!recording){
                const classAttributCandidate = this.openTag.substring(i, i+classAttribut.length);
                if(classAttributCandidate===classAttribut){
                    recording = true;
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
                attributValue += content;
            }
        }
        return attributValue;
    }

    determineCompleteTag = ()=>{
        this.completeTag = this.allHtml;
    }
    
    constructAnalyze=()=>{
        this.analyze = {
            tagName : this.tag,
            completeTag : this.completeTag,
            parentTag : this.parentTag,
            content : this.content,
            cssClass : this.cssClass,
            cssId : this.cssId,
            contentOnlyText : this.contentOnlyText
        };
    }
}