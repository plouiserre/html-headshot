import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { discoverTag } from "../src/discoverTag";

const simpleHtml = getContentFile('../dataTests/simpleHtml.txt');
const simpleTableHtml = getContentFile('../dataTests/simpleTableHtml.txt');

function getContentFile(nomFichier){
  const repertoire = dirname(fileURLToPath(import.meta.url))
  const byteFichier = fs.readFileSync(join(repertoire, nomFichier))
  const contenu = byteFichier.toString('utf8');
  return contenu;
}


test('lister toutes les balises de ce code html simple', () => {
  const tags = discoverTag(simpleHtml);
  expect(20).toBe(tags.length);
  expect('div').toBe(tags[0]);
  expect('ul').toBe(tags[1]);
  expect('li').toBe(tags[2]);
  expect('a').toBe(tags[3]);
  expect('span').toBe(tags[4]);
  expect('li').toBe(tags[5]);
  expect('a').toBe(tags[6]);
  expect('span').toBe(tags[7]);
  expect('li').toBe(tags[8]);
  expect('a').toBe(tags[9]);
  expect('span').toBe(tags[10]);
  expect('li').toBe(tags[11]);
  expect('a').toBe(tags[12]);
  expect('span').toBe(tags[13]);
  expect('li').toBe(tags[14]);
  expect('a').toBe(tags[15]);
  expect('span').toBe(tags[16]);
  expect('li').toBe(tags[17]);
  expect('a').toBe(tags[18]);
  expect('span').toBe(tags[19]);
});

test('lister toutes les balises de ce tableau html simple', () => {
    const tags = discoverTag(simpleTableHtml);
    expect(18).toBe(tags.length);
    expect('table').toBe(tags[0]);
    expect('tbody').toBe(tags[1]);
    expect('tr').toBe(tags[2]);
    expect('td').toBe(tags[3]);
    expect('b').toBe(tags[4]);
    expect('tr').toBe(tags[5]);
    expect('td').toBe(tags[6]);
    expect('p').toBe(tags[7]);
    expect('a').toBe(tags[8]);
    expect('br').toBe(tags[9]);
    expect('a').toBe(tags[10]);
    expect('br').toBe(tags[11]);
    expect('a').toBe(tags[12]);
    expect('br').toBe(tags[13]);
    expect('a').toBe(tags[14]);
    expect('br').toBe(tags[15]);
    expect('a').toBe(tags[16]);
    expect('br').toBe(tags[17]);
  });