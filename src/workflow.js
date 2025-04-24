import suckPage from "./dom/suckPage.js";
import Dom from "./dom/dom.js";
import CleanPage from "./dom/cleanPage.js";
import Log from "./log.js";
import MultiSearch from "./search/multiSearch.js";

export default class Workflow{
    
    async execute(options) {
        const log = new Log({type : 'file'});
        const suckPageHtml = new suckPage(options.url);
        const html = await suckPageHtml.getPage();
        const cleanPageHtml = new CleanPage(html, ['\n', '\t', '<br />', '← ', ' →', '•']);
        const htmlCleaned = cleanPageHtml.deleteUselessElements();
        const domPage = new Dom(log);
        const domResult = domPage.buildDom(htmlCleaned);
        const multiSearch = new MultiSearch(domResult);
        const result = multiSearch.execute(options.requests);
    }
}