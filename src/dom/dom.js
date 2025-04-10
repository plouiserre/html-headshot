import ExtractAllTags from "./extract/extractAllTags.js"
import AnalyzeTag from "./analyzeTag.js"

export default class Dom{
    constructor(log){
      this.log = log;
      this.m = 0;
    }

    buildDom = (html)=>{
        const domResult = [];
        const htmlToAnalyze = [];
        htmlToAnalyze.push({html : html, parentElement : ''});
        while(htmlToAnalyze.length > 0){
            const lastEntry = htmlToAnalyze.pop();
            const tags = lastEntry.html;
            const analyzes = this.workingPartDom(tags, lastEntry.parentElement);
            for(let i = 0; i < analyzes.length; i ++){
                const analyze = analyzes[i];
                domResult.push(analyze);
                if(!analyze.contentOnlyText)
                    htmlToAnalyze.push({html : analyze.content, parentElement : analyze.completeTag});
            }
        }
        return domResult;
    }

    workingPartDom = (html, parentTag)=>{
        this.extractAllTags = new ExtractAllTags();
        this.logsMessage(html);
        const tags = this.extractAllTags.extract(html);
        const analyzes = [];
        for(let i = 0; i < tags.length; i ++){
            this.analyze = new AnalyzeTag();
            const analyze = this.analyze.analyzeData(tags[i], parentTag);
            analyzes.push(analyze);
        }
        return analyzes;
    }

    logsMessage = (html)=>{
        if(this.m == 0){
            this.log.write(`${this.m}: html analysé avant l'extract \n ${html}`);
        }
        else {
            this.log.write(`\n\n\n${this.m}: html analysé avant l'extract \n ${html}`);
        }
    }
}