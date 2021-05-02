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
      common: {
        + follow: false
          setting1: Value 1
        - setting2: 200
        - setting3: true
        + setting3: null
        + setting4: blah blah
        + setting5: {
              key5: value5
          }
          setting6: {
              doge: {
                - wow: 
                + wow: so much
              }
              key: value
            + ops: vops
          }
      }
      group1: {
        - baz: bas
        + baz: bars
          foo: bar
        - nest: {
              key: value
          }
        + nest: str
      }
    - group2: {
          abc: 12345
          deep: {
              id: 45
          }
      }
    + group3: {
          deep: {
              id: {
                  number: 45
              }
          }
          fee: 100500
      }
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
