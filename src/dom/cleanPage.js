export default class CleanPage{
    constructor(html, caractersToReplace){
        this.html = html;
        this.caractersToReplace = caractersToReplace;
        this.startCommentaries = [];
        this.endCommentaries = [];
        this.htmlCleaned = '';
    }

    deleteUselessElements = ()=>{
        this.htmlCleaned = this.html;
        for(let i = 0; i < this.caractersToReplace.length; i ++){
            this.htmlCleaned =  this.htmlCleaned.replaceAll(this.caractersToReplace[i],' ');
        }
        this.deleteCommentaries();
        this.deleteSpecialCaractersInHtml();
        return this.htmlCleaned;
    }

    deleteCommentaries = () =>{
        this.listStartCommentaries();
        this.listEndCommentaries();
        if(this.startCommentaries.length != 0){
            let htmlNotCleaned = this.htmlCleaned;
            for(let i = 0; i < this.startCommentaries.length; i++){
                const commentary = this.htmlCleaned.substring(this.startCommentaries[i], this.endCommentaries[i]);
                htmlNotCleaned = htmlNotCleaned.replace(commentary,'');
            }
            this.htmlCleaned = htmlNotCleaned;
        }
    }

    listStartCommentaries = () => {
        const commentaryOpen = '<!--';
        for(let i = 0; i < this.htmlCleaned.length ; i++){
            const nextLetters = this.htmlCleaned.substring(i, i + commentaryOpen.length);
            if(nextLetters === commentaryOpen)
                this.startCommentaries.push(i);
        }
    }

    listEndCommentaries = () => {
        const commentaryClosed = '-->';
        for(let i = 0; i < this.htmlCleaned.length ; i++){
            const endCommentaryIndex = i + commentaryClosed.length;
            const nextLetters = this.htmlCleaned.substring(i, endCommentaryIndex);
            if(nextLetters === commentaryClosed)
                this.endCommentaries.push(endCommentaryIndex);
        }
    }
    
    deleteSpecialCaractersInHtml = () =>{
        let isStartedCommentary = false;
        let startIndexs = [];
        let endIndexs = [];
        let allTextsToReplace = [];
        for(let i = 0; i < this.htmlCleaned.length; i ++){
            const caracter = this.htmlCleaned[i];
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
            const specialCaracterToDelete = this.htmlCleaned.substring(startIndex, endIndex + 1);
            allTextsToReplace.push(specialCaracterToDelete);
        }

        for(let i = 0; i < allTextsToReplace.length; i ++){
            const replaceText = allTextsToReplace[i];
            this.htmlCleaned = this.htmlCleaned.replace(replaceText, '');
        }
    }
}