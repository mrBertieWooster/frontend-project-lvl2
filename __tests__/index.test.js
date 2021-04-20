import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import getDiff from '../lib/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '../', '__fixtures__', filename);
const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');
const incorrectFile = getFixturePath('json1.txt');
const correctResult = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('getting json difference', () => {
  expect(getDiff(json1, json2)).toBe(correctResult);
});

test('getting yaml difference', () => {
  expect(getDiff(yml1, yml2)).toBe(correctResult);
});

test('check incorrect extension', () => {
  expect(() => getDiff(json1, incorrectFile)).toThrow('unsupported file extension');
});

test('check empty file', () => {
  expect(() => getDiff(json1, '')).toThrow();
});
