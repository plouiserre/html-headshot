import CleanPage from "../src/cleanPage";


test('Delete all \n and \t caracteres', async ()=>{
    const html = '<div>Je suis ton père \n Tu me dois le respect !!!!! \t\t OK?? \n</div>';
    const cleanPage = new CleanPage(html, ['\n', '\t']);
    const htmlCleaned = cleanPage.deleteUselessElements();

    const expected = '<div>Je suis ton père   Tu me dois le respect !!!!!    OK??  </div>';
    expect(htmlCleaned).toBe(expected);
});

test('Delete many commentaries <!-- and -->', async ()=>{
    const html = '<!-- test pour clean page --><div>Je suis ton père \n Tu me <!-- second test pour clean page --> dois le respect <!-- troisième test pour clean page --> !!!!! \t\t OK?? \n</div>';
    const cleanPage = new CleanPage(html, ['\n', '\t']);
    const htmlCleaned = cleanPage.deleteUselessElements();

    const expected = '<div>Je suis ton père   Tu me  dois le respect  !!!!!    OK??  </div>';
    expect(htmlCleaned).toBe(expected);
})