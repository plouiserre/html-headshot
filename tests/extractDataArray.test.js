import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { extractDataArray } from '../src/extractDataArray';

const ligneTableauPKM = '<tr><td rowspan="1">0001</td><td><span class="mw-default-size notpageimage miniature" typeof="mw:File"><a href="/Pok%C3%A9mon_n%C2%B00001" title="Pokémon n°0001"><img alt="0001" src="/images/d/db/Miniature_0001_EV.png" decoding="async" width="256" height="256" class="mw-file-element"></a></span></td><td height="50px" id="Bulbizarre"><a href="/Bulbizarre" title="Bulbizarre">Bulbizarre</a></td><td><a href="https://bulbapedia.bulbagarden.net/wiki/Bulbasaur_(Pok%C3%A9mon)" class="extiw" title="en:Bulbasaur (Pokémon)">Bulbasaur</a></td><td><a href="https://www.pokewiki.de/Bisasam" class="extiw" title="de:Bisasam">Bisasam</a></td><td><span lang="ja"><ruby lang="ja"><rb><a href="https://wiki.xn--rckteqa2e.com/wiki/%E3%83%95%E3%82%B7%E3%82%AE%E3%83%80%E3%83%8D" class="extiw" title="ja:フシギダネ">フシギダネ</a></rb><rp>（</rp><rt class="furigana" style="font-size: .75em;">Fushigidane</rt><rp>）</rp></ruby></span></td><td><a href="https://wiki.xn--rckteqa2e.com/wiki/%E3%83%95%E3%82%B7%E3%82%AE%E3%83%80%E3%83%8D" class="extiw" title="ja:フシギダネ">Fushigidane</a></td><td><span typeof="mw:File"><a href="/Plante_(type)" title="Plante"><img alt="Plante" src="/images/thumb/d/d9/Miniature_Type_Plante_EV.png/80px-Miniature_Type_Plante_EV.png" decoding="async" width="80" height="16" class="mw-file-element" srcset="/images/thumb/d/d9/Miniature_Type_Plante_EV.png/120px-Miniature_Type_Plante_EV.png 1.5x, /images/thumb/d/d9/Miniature_Type_Plante_EV.png/160px-Miniature_Type_Plante_EV.png 2x"></a></span><br><span typeof="mw:File"><a href="/Poison_(type)" title="Poison (type)"><img alt="Poison" src="/images/thumb/1/1c/Miniature_Type_Poison_EV.png/80px-Miniature_Type_Poison_EV.png" decoding="async" width="80" height="16" class="mw-file-element" srcset="/images/thumb/1/1c/Miniature_Type_Poison_EV.png/120px-Miniature_Type_Poison_EV.png 1.5x, /images/thumb/1/1c/Miniature_Type_Poison_EV.png/160px-Miniature_Type_Poison_EV.png 2x"></a></span></td></tr>';

test('contenu troisième colonne renvoyé', () => {
  const troisiemeColonneHtml = '<a href="/Bulbizarre" title="Bulbizarre">Bulbizarre</a>';
  const options = { uniquementText : false};
  const result = extractDataArray(ligneTableauPKM, options);
  expect(result).toBe(troisiemeColonneHtml);
});

test('uniquement le texte est renvoyé', () => {
  const textTroisiemeColonne = 'Bulbizarre';
  const options = { uniquementText : true};
  const result = extractDataArray(ligneTableauPKM, options);
  expect(result).toBe(textTroisiemeColonne);
});