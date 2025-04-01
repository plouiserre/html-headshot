export default class DeleteExtractHtml{
    constructor(html, extraction){
        this.html = html;
        this.extraction = extraction;
        this.htmlRemaining = '';
    }

    determineHtmlRemaining = ()=>{
        if(this.html[0]==='<')
            this.determineWhenSameStart();
        else
            this.determineWhenDifferentStart();
        return this.htmlRemaining;
    }

    determineWhenSameStart = () =>{
        this.htmlRemaining = this.getHtmlRemaining(this.html);
        return this.htmlRemaining;
    }

   determineWhenDifferentStart = () =>{
        let startWhenItIsSame = this.determineWhenItIsStart();
        const htmlGoodStarter = this.html.substring(startWhenItIsSame, this.html.length);
        let htmlRemainingWithSameStarter = this.getHtmlRemaining(htmlGoodStarter);
        htmlRemainingWithSameStarter = this.cleanhtmlRemaining(htmlRemainingWithSameStarter);
        let htmlRemainingBeforeStarter = this.html.substring(0, startWhenItIsSame);
        htmlRemainingBeforeStarter = this.cleanhtmlRemaining(htmlRemainingBeforeStarter);
        this.htmlRemaining = htmlRemainingBeforeStarter + htmlRemainingWithSameStarter;
        return this.htmlRemaining;
    }

    cleanhtmlRemaining = (htmlWorking) =>{
        let htmlCleaning = htmlWorking;
        const htmlRemainingWithoutSpace = htmlCleaning.trim();
        if(htmlRemainingWithoutSpace.length === 0)
            htmlCleaning = "";
        else if(!htmlRemainingWithoutSpace.includes("<") && !htmlRemainingWithoutSpace.includes(">"))
            htmlCleaning = "";
        htmlCleaning = htmlCleaning.trim();
        return htmlCleaning;
    }

    determineWhenItIsStart = ()=>{
        let startWhenItIsSame = 0;
        for(let i = 0; i < this.html.length ; i++){
            if(this.html[i] === '<'){
                startWhenItIsSame = i;
                break;
            }
            else{
                continue;
            }
        }
        return startWhenItIsSame;
    }

    getHtmlRemaining = (htmlWorking) =>{
        let htmlRemainingCalculate = '';
        for(let i = 0; i < htmlWorking.length ; i++){
            const caracterHtml = htmlWorking[i];
            const caracterExtraction = this.extraction[i];
            if(caracterExtraction === caracterHtml)
                continue;
            else{
                htmlRemainingCalculate += htmlWorking[i];
            }
        }
        return htmlRemainingCalculate;
    }
}