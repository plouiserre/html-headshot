import suckPage from "./src/dom/suckPage.js";
import Dom from "./src/dom/dom.js";
import CleanPage from "./src/dom/cleanPage.js";
import Log from "./src/log.js";

const log = new Log({type : 'file'});
const suckPageHtml = new suckPage("https://www.pokepedia.fr/Liste_des_Pok%C3%A9mon_de_la_troisi%C3%A8me_g%C3%A9n%C3%A9ration");
const html = await suckPageHtml.getPage();
console.log(`taille html ${html.length}`);
const cleanPageHtml = new CleanPage(html, ['\n', '\t', '<br />', '← ', ' →', '•']);
const htmlCleaned = cleanPageHtml.deleteUselessElements();
const domPage = new Dom(log);
const domResult = domPage.buildDom(htmlCleaned);
console.log('fin!!');

//composition 
// -> l'index.js sera le workflow.js
// -> un fichier qui va gérer le html

//pensées 
// -> pas de TUs
// -> le fichier workflow sera appelé par l'index js
// -> faire un test avec la page de pour les générations et savoir si on obtient les dom.js
// -> si ca foire je ferai une autre US quand j'aurai compris la cause