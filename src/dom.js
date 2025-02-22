import ExtractTag from "./extractTag"
import AnalyzeTag from "./analyzeTag"

export default class Dom{
    constructor(){
      this.extract = new ExtractTag();
      this.analyze = new AnalyzeTag();
    }

    buildDom = (html)=>{
        
    }

    workingPartDom = (html)=>{
        const tag = this.extract.extract(html);
    }
}