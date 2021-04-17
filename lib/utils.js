import { resolve } from 'path';
import { readFileSync } from 'fs';

const getAbsPath = (filePath) => resolve(filePath);

const checkExtension = (path) => {

};

export default (path) => {
  const absPath = getAbsPath(path);
  try {
    if (checkExtension(path)) {
      return readFileSync(absPath, 'utf8');
    }
  } catch (e) {
    throw e;
  }
};
