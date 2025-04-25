import Workflow from "./src/workflow.js";

const options = {
    url : "https://www.pokepedia.fr/Pok%C3%A9p%C3%A9dia:%C3%80_propos",
    requests : {
        parameters : '.mw-content-ltr mw-parser-output > .table',
        mode : 'text'
    }
};
const workflow = new Workflow();
await workflow.execute(options);