import ExtractTag from "./extractTag"
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
                if(!analyze.contentOnlyText === true)
                    htmlToAnalyze.push(analyze.content);
            }
        }
        return domResult;
    }

    workingPartDom = (html)=>{
        this.extract = new ExtractTag();
        this.analyze = new AnalyzeTag();
        const tags = this.extract.extract(html);
        const analyzes = [];
        for(let i = 0; i < tags.length; i ++){
            const analyze = this.analyze.analyzeData(tags[i]);
            analyzes.push(analyze);
        }
        return analyzes;
    }
}