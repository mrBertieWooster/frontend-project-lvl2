import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '../', '__fixtures__', filename);
const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const incorrectFile = getFixturePath('json1.txt');
const correctResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('getting file difference', () => {
  expect(getDiff(json1, json2)).toBe(correctResult);
});

test('catching exception', () => {
  expect(() => getDiff(json1, incorrectFile)).toThrow();
});
