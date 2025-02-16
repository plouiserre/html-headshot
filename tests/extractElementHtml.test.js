import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { extractElementHtml } from '../src/extractElementHtml';

const htmlPage = getContentFile('../dataTests/htmlPage.txt');
const headHtml = getContentFile('../dataTests/headHtml.txt');

function getContentFile(nomFichier){
  const repertoire = dirname(fileURLToPath(import.meta.url))
  const byteFichier = fs.readFileSync(join(repertoire, nomFichier))
  const contenu = byteFichier.toString('utf8');
  return contenu;
}

test('renvoie le tableau de la page Html', () => {
  const content = extractElementHtml(htmlPage,'head');
  expect(content).toBe(headHtml);
});
