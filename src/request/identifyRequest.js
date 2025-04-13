export default class IdentifyRequest{
    constructor(request){
        this.request = request;
    }

    analyze = () =>{
        const requestIdentified = [];
        const requestsDivised = this.request.split('>');
        for(let i = 0; i < requestsDivised.length; i ++){
            const parameters = requestsDivised[i];
            const typeRequest = this.detectTypeFinding(parameters);
            const filter = this.detectFilter(parameters, typeRequest);
            requestIdentified.push(filter, typeRequest);
        }
        return requestIdentified;
    }

    detectTypeFinding = (parameters) =>{
        const firstCaracter = parameters[0];
        if(firstCaracter === "#")
            return 'id';
        else if(firstCaracter === ".")
            return 'class';
        else
            return 'tagName';
    }

    detectFilter = (parameters, typeRequest) => {
        if(typeRequest === 'id')
            return parameters.replace('#','');
        else if(typeRequest === 'class')
            return parameters.replace('.','');
        else 
            return parameters;
    }
}