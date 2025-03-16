import fs from 'fs'

export default class Log{
    constructor(options){
        this.options = options;
        this.msg = '';
        this.nameFile = '';
        this.createLogFile();
    }

    createLogFile=()=>{
        const ts = Date.now();
        const date = new Date(ts);
        const dateFile = `${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        this.nameFile =`./Debug/${dateFile}.txt`;
        fs.createWriteStream(this.nameFile);
    }

    write = (msg) =>{
        this.msg = msg;
        if(this.options.type === 'file')
            this.writeFile();
        else 
            this.writeConsole();
    };

    writeFile = () =>{
        fs.appendFileSync(this.nameFile, this.msg);
    };

    writeConsole = () =>{
        console.log(this.msg);
    };
}