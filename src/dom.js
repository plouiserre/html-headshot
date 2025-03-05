import ExtractAllTags from "./extractAllTags"
import AnalyzeTag from "./analyzeTag"

export default class Dom{
    constructor(){
      
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