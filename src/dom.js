import ExtractTag from "./extractTag"
import AnalyzeTag from "./analyzeTag"

export default class Dom{
    constructor(){
      
    }

    buildDom = (html)=>{
        const domResult = [];
        const htmlToAnalyze = [];
        htmlToAnalyze.push(html);
        // const firstAnalyze = this.workingPartDom(html);
        //let contentToAnalyze = firstAnalyze.content;
        //domResult.push(firstAnalyze);
        while(htmlToAnalyze.length > 0){
            const tags = htmlToAnalyze.pop();
            const analyze = this.workingPartDom(tags);
            domResult.push(analyze);
            if(!analyze.contentOnlyText === true)
                htmlToAnalyze.push(analyze.content);
        }
        return domResult;
    }

    workingPartDom = (html)=>{
        this.extract = new ExtractTag();
        this.analyze = new AnalyzeTag();
        const tag = this.extract.extract(html);
        const analyze = this.analyze.analyzeData(tag);
        return analyze;
    }
}