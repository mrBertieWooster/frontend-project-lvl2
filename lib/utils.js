import { resolve } from 'path';
import { readFileSync } from 'fs';

const getAbsPath = (filePath) => resolve(filePath);

export default (path) => {
  const absPath = getAbsPath(path);
  try {
    return readFileSync(absPath, 'utf8');
  } catch (e) {
    throw e;
  }
};
