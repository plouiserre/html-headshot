import axios from "axios";

export default class suckPage{
    constructor(url){
        this.url = url;
        this.data = '';
    }

    //TODO gérer quand il y a une erreur http
    getPage = async ()=>{
        const response = await axios.get(this.url);
        this.data = response.data;
        return this.data;
    }
}