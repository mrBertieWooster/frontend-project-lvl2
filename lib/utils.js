import { resolve } from 'path';
import { readFileSync } from 'fs';

export const readFile = (path) => {
  const absPath = getAbsPath(path);
  try {
    return readFileSync(absPath, 'utf8');
  } catch(e) {
    throw e;
  }
}

const getAbsPath = (filePath) => {
  return resolve(filePath);
}
