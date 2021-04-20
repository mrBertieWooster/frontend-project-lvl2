import { resolve, extname } from 'path';
import { readFileSync } from 'fs';

const getAbsPath = (filePath) => resolve(filePath);

const checkExtension = (path) => extname(path) === '.json';

export default (path) => {
  const absPath = getAbsPath(path);
  try {
    if (!checkExtension(absPath)) throw new Error('unsupported file extension');
    const result = readFileSync(absPath, 'utf8');
    if (result === '') throw new Error(`empty file ${absPath}`);
    return result;
  } catch (e) {
    console.log(`error while reading file ${absPath}`);
    throw e;
  }
};
