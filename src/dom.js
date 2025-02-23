import ExtractTag from "./extractTag"
import AnalyzeTag from "./analyzeTag"

export default class Dom{
    constructor(){
      
    }

    buildDom = (html)=>{
        const dom = [];
        const firstAnalyze = this.workingPartDom(html);
        dom.push(firstAnalyze);
        const secondAnalyze = this.workingPartDom(firstAnalyze.content);
        dom.push(secondAnalyze);
        return dom;
    }

    workingPartDom = (html)=>{
        this.extract = new ExtractTag();
        this.analyze = new AnalyzeTag();
        const tag = this.extract.extract(html);
        const analyze = this.analyze.analyzeData(tag);
        return analyze;
    }
}