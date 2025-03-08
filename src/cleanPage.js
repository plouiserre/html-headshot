export default class CleanPage{
    constructor(html, simpleCaracter){
        this.html = html;
        this.simpleCaracter = simpleCaracter;
        this.startCommentaries = [];
        this.endCommentaries = [];
    }

    deleteUselessElements = ()=>{
        let htmlCleaned = this.html;
        for(let i = 0; i < this.simpleCaracter.length; i ++){
            htmlCleaned =  htmlCleaned.replaceAll(this.simpleCaracter[i],' ');
        }
        this.html = htmlCleaned;
        htmlCleaned = this.deleteCommentaries();
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
}