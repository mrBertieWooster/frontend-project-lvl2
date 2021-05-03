import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import getDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '../', '__fixtures__', filename);
const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');
const incorrectFile = getFixturePath('json1.txt');
const correctResultJson = readFileSync(getFixturePath('correct_diff.json'), 'utf-8');
const correctResultPlain = readFileSync(getFixturePath('correct_plain'), 'utf-8');

test('getting json difference', () => {
  expect(getDiff(json1, json2)).toBe(correctResultJson);
});

test('getting yaml difference', () => {
  expect(getDiff(yml1, yml2)).toBe(correctResultJson);
});

test('getting json difference plain', () => {
  expect(getDiff(json1, json2, 'plain')).toBe(correctResultPlain);
});

test('getting yaml difference plain', () => {
  expect(getDiff(yml1, yml2, 'plain')).toBe(correctResultPlain);
});

test('check incorrect extension', () => {
  expect(() => getDiff(json1, incorrectFile)).toThrow('unsupported file extension');
});

test('check empty file', () => {
  expect(() => getDiff(json1, '')).toThrow();
});
