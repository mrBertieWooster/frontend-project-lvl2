import { readFile } from './utils.js';

export const getDiff = (path1, path2) => {
  console.log('getting diff');
  const firstFile = readFile(path1);
}
