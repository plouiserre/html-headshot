import fs from 'fs'

export default class Log{
    constructor(options){
        this.options = options;
        this.msg = '';
    }

    write = (msg) =>{
        this.msg = msg;
        if(this.options.type === 'file')
            this.writeFile();
        else 
            this.writeConsole();
    };

    writeFile = () =>{
        const ts = Date.now();
        const date = new Date(ts);
        const dateFile = `${date.getFullYear()}${date.getMonth()}${date.getDay()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        fs.writeFileSync(`./Debug/${dateFile}.txt`, this.msg);
    };

    writeConsole = () =>{
        console.log(this.msg);
    };
}