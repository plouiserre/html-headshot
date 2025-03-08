import suckPage from "./src/suckPage.js";
import Dom from "./src/dom.js"
import CleanPage from "./src/cleanPage.js";

const suckPageHtml = new suckPage("https://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_de_la_troisi%C3%A8me_g%C3%A9n%C3%A9ration");
const html = await suckPageHtml.getPage();
console.log(`taille html ${html.length}`);
const cleanPageHtml = new CleanPage(html, ['\n', '<!--', '-->']);
const htmlCleaned = cleanPageHtml.deleteUselessElements();
const domPage = new Dom();
domPage.buildDom(htmlCleaned);

//composition 
// -> l'index.js sera le workflow.js
// -> un fichier qui va gérer le html

//pensées 
// -> pas de TUs
// -> le fichier workflow sera appelé par l'index js
// -> faire un test avec la page de pour les générations et savoir si on obtient les dom.js
// -> si ca foire je ferai une autre US quand j'aurai compris la cause