import ExtractAllTags from "./extractAllTags.js"
import AnalyzeTag from "./analyzeTag.js"

export default class Dom{
    constructor(log){
      this.log = log;
    }

    buildDom = (html)=>{
        const domResult = [];
        const htmlToAnalyze = [];
        htmlToAnalyze.push(html);
        let m = 0;
        while(htmlToAnalyze.length > 0){
            //------------ A SUPPRIMER ------------//
            console.log(`m ${m}`);
            if(m == 10){
                console.log('stop!!!!');
            }
            //------------ A SUPPRIMER ------------//
            const tags = htmlToAnalyze.pop();
            const analyzes = this.workingPartDom(tags);
            for(let i = 0; i < analyzes.length; i ++){
                const analyze = analyzes[i];
                domResult.push(analyze);
                if(!analyze.contentOnlyText)
                    htmlToAnalyze.push(analyze.content);
            }
            m+=1;
        }
        return domResult;
    }

    workingPartDom = (html)=>{
        this.extractAllTags = new ExtractAllTags();
        const tags = this.extractAllTags.extract(html);
        const analyzes = [];
        for(let i = 0; i < tags.length; i ++){
            this.analyze = new AnalyzeTag();
            const analyze = this.analyze.analyzeData(tags[i]);
            analyzes.push(analyze);
        }
        return analyzes;
    }
}