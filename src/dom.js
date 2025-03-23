import ExtractAllTags from "./extractAllTags.js"
import AnalyzeTag from "./analyzeTag.js"

export default class Dom{
    constructor(log){
      this.log = log;
      this.m = 0;
    }

    buildDom = (html)=>{
        const domResult = [];
        const htmlToAnalyze = [];
        htmlToAnalyze.push(html);
        while(htmlToAnalyze.length > 0){
            const tags = htmlToAnalyze.pop();
            const analyzes = this.workingPartDom(tags);
            for(let i = 0; i < analyzes.length; i ++){
                const analyze = analyzes[i];
                domResult.push(analyze);
                if(!analyze.contentOnlyText)
                    htmlToAnalyze.push(analyze.content);
            }
            this.m += 1;
        }
        return domResult;
    }

    workingPartDom = (html)=>{
        this.extractAllTags = new ExtractAllTags();
        this.logsMessage(html);
        const tags = this.extractAllTags.extract(html);
        const analyzes = [];
        for(let i = 0; i < tags.length; i ++){
            this.analyze = new AnalyzeTag();
            const analyze = this.analyze.analyzeData(tags[i]);
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