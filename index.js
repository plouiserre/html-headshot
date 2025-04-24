import Workflow from "./src/workflow.js";

const options = {
    url : "https://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_de_la_troisi%C3%A8me_g%C3%A9n%C3%A9ration",
    requests : {
        parameters : '#pt-login > a',
        mode : 'tags'
    }
};
const workflow = new Workflow();
workflow.execute(options);