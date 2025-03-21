import CleanPage from "../src/cleanPage";


test('Delete all \n and \t caracteres <br />', async ()=>{
    const html = '<div>Je suis ton père \n Tu me dois le respect !!!!! <br /> \t\t OK?? \n</div>';
    const cleanPage = new CleanPage(html, ['\n', '\t', '<br />']);
    const htmlCleaned = cleanPage.deleteUselessElements();

    const expected = '<div>Je suis ton père  Tu me dois le respect !!!!!   OK?? </div>';
    expect(htmlCleaned).toBe(expected);
});

test('Delete many commentaries <!-- and -->', async ()=>{
    const html = '<!-- test pour clean page --><div>Je suis ton père \n Tu me <!-- second test pour clean page --> dois le respect <!-- troisième test pour clean page --> !!!!! \t\t OK?? \n</div>';
    const cleanPage = new CleanPage(html, ['\n', '\t']);
    const htmlCleaned = cleanPage.deleteUselessElements();

    const expected = '<div>Je suis ton père  Tu me  dois le respect  !!!!!  OK?? </div>';
    expect(htmlCleaned).toBe(expected);
})



test('Delete caracters html starting with & and finishing with ;', async ()=>{
    const html = '<p>&#160;1 <a href="#Nouveaux_Pokémon">Nouveaux Pokémon</a>&#160;<br />&#8195;&#8195;1.1 <a href="#Nouveaux_Pokémon">0001 (Bulbizarre) à 0050 (Taupiqueur)</a>&#160;<br />&#8195;&#8195;1.2 <a href="#Taupiqueur">0051 (Triopikeur) à 0100 (Voltorbe)</a>&#160;<br />&#8195;&#8195;1.3 <a href="#Voltorbe">0101 (Électrode) à 0151 (Mew)</a>&#160;<br />&#160;2 <a href="#Voir_aussi">Voir aussi</a>&#160;<br />';
    const cleanPage = new CleanPage(html, ['\n', '\t', '<br />']);
    const htmlCleaned = cleanPage.deleteUselessElements();

    const expected = '<p>1 <a href="#Nouveaux_Pokémon">Nouveaux Pokémon</a>1.1 <a href="#Nouveaux_Pokémon">0001 (Bulbizarre) à 0050 (Taupiqueur)</a>1.2 <a href="#Taupiqueur">0051 (Triopikeur) à 0100 (Voltorbe)</a>1.3 <a href="#Voltorbe">0101 (Électrode) à 0151 (Mew)</a>2 <a href="#Voir_aussi">Voir aussi</a>';
    expect(htmlCleaned).toBe(expected);
})

