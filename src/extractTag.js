export default class ExtractTag{
    constructor(){
        this.isSimpleTag = false;
    }

    extract = (tag, html) =>{
        let contentTag = '';
        let sameOpenTag = 0;
        this.determinateIsSimpleTag(html);
        const closedTag = this.generateClosedTag(tag);
        const openTag = this.generateOpenTag(tag);
        for(let i = 0; i < html.length; i ++){
            const openTagCandidate = this.generateTagCandidate(i, openTag.length, html);
            const closedTagCandidate = this.generateTagCandidate(i, closedTag.length, html);
            if(openTagCandidate == openTag){
                sameOpenTag +=1 ;
            }
            if(closedTagCandidate == closedTag && sameOpenTag <= 0)
                break;
            if(closedTagCandidate == closedTag)
                sameOpenTag -= 1;
            contentTag+=html[i];
        }
        const tagBuild = openTag+contentTag+closedTag;
        return tagBuild;
    }

    generateOpenTag = (tag)=>{
        const openTag = this.isSimpleTag ? '<'+tag+'>' : '<'+tag;+' ';
        return openTag;
    }
    
    determinateIsSimpleTag = (html)=>{
        return this.isSimpleTag = html[0] != ' ' ? true : false;
    }
    
    generateTagCandidate = (index, closedTagLength, html)=>{
        const endSubstring = index + closedTagLength;
        const closedTagCandidate = html.substring(index , endSubstring);
        return closedTagCandidate;
    }
    
    generateClosedTag = (tag)=>{
        let closedTag = '</'+tag+'>';
        return closedTag;
    };
}