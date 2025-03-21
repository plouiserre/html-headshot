export default class CleanPage{
    constructor(html, caractersToReplace){
        this.html = html;
        this.caractersToReplace = caractersToReplace;
        this.startCommentaries = [];
        this.endCommentaries = [];
    }

    deleteUselessElements = ()=>{
        let htmlCleaned = this.html;
        for(let i = 0; i < this.caractersToReplace.length; i ++){
            htmlCleaned =  htmlCleaned.replaceAll(this.caractersToReplace[i],'');
        }
        this.html = htmlCleaned;
        htmlCleaned = this.deleteCommentaries();
        htmlCleaned = this.deleteSpecialCaractersInHtml(htmlCleaned);
        return htmlCleaned;
    }

    deleteCommentaries = () =>{
        this.listStartCommentaries();
        this.listEndCommentaries();
        if(this.startCommentaries.length != 0){
            let htmlCleaned = this.html;
            for(let i = 0; i < this.startCommentaries.length; i++){
                const commentary = this.html.substring(this.startCommentaries[i], this.endCommentaries[i]);
                htmlCleaned = htmlCleaned.replace(commentary,'');
            }
            return htmlCleaned;
        }
        else {
            return this.html;
        }
    }

    listStartCommentaries = () => {
        const commentaryOpen = '<!--';
        for(let i = 0; i < this.html.length ; i++){
            const nextLetters = this.html.substring(i, i + commentaryOpen.length);
            if(nextLetters === commentaryOpen)
                this.startCommentaries.push(i);
        }
    }

    listEndCommentaries = () => {
        const commentaryClosed = '-->';
        for(let i = 0; i < this.html.length ; i++){
            const endCommentaryIndex = i + commentaryClosed.length;
            const nextLetters = this.html.substring(i, endCommentaryIndex);
            if(nextLetters === commentaryClosed)
                this.endCommentaries.push(endCommentaryIndex);
        }
    }

    //si trop relou voir à mettre dans une classe particulière
    deleteSpecialCaractersInHtml = (htmlCleaned) =>{
        let isStartedCommentary = false;
        let startIndexs = [];
        let endIndexs = [];
        let allTextsToReplace = [];
        for(let i = 0; i < htmlCleaned.length; i ++){
            const caracter = htmlCleaned[i];
            if(caracter === "&"){
                isStartedCommentary = true;
                startIndexs.push(i);
            }
            if(isStartedCommentary && caracter === ";"){
                isStartedCommentary = false;
                endIndexs.push(i);
            }
        }
        
        for(let i = 0; i < startIndexs.length ; i++){
            const startIndex = startIndexs[i];
            const endIndex = endIndexs[i];
            const specialCaracterToDelete = htmlCleaned.substring(startIndex, endIndex + 1);
            allTextsToReplace.push(specialCaracterToDelete);
        }

        for(let i = 0; i < allTextsToReplace.length; i ++){
            const replaceText = allTextsToReplace[i];
            htmlCleaned = htmlCleaned.replace(replaceText, '');
        }
        return htmlCleaned;
    }
}