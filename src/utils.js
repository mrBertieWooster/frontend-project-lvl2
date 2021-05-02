import { resolve } from 'path';
import { readFileSync } from 'fs';

const getAbsPath = (filePath) => resolve(filePath);

export default (path) => {
  const absPath = getAbsPath(path);
  try {
    const result = readFileSync(absPath, 'utf8');
    if (result === '') throw new Error(`empty file ${absPath}`);
    return result;
  } catch (e) {
    console.log(`error while reading file ${absPath}`);
    throw e;
  }
};
