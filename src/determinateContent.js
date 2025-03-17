export default class DeterminateContent{
    constructor(openTag, closedTag){
        this.openTag = openTag;
        this.closedTag = closedTag;
    }

    calculate = (html)=>{
        let openTagTime = 0;
        let simpleOpenTag = this.determinateSimpleTag();
        let indexEnd = 0;
        for(let i = 0; i < html.length; i ++){
            const nextOpenTagPossible = html.substring(i, simpleOpenTag.length + i);
            const nextClosedTagPossible = html.substring(i, this.closedTag.length + i);
            if(simpleOpenTag === nextOpenTagPossible)
                openTagTime +=1;
            else if(nextClosedTagPossible == this.closedTag && openTagTime === 1){
                indexEnd = i + this.closedTag.length;
                break;
            }
            else if(nextClosedTagPossible == this.closedTag)
                openTagTime -=1;
        }
        
        const content = this.determinateContent(html, indexEnd);
        return content;
    }

    determinateContent = (text, indexEndOfAllSelection) => {
        const startIndex = this.openTag.length;
        const endIndex = indexEndOfAllSelection - this.closedTag.length;
        
        const content = text.substring(startIndex, endIndex);
        return content;
    }

    determinateSimpleTag = ()=>{
        return this.openTag.split(' ')[0];
    }
}