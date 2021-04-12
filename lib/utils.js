import * as path from 'path';
import * as fs from 'fs';

export const readFile = (path) => {
  const absPath = getAbsPath(path);
  console.log(`path ${path}`);
  console.log(`absPath ${absPath}`);
  try {
    if (!fs.existsSync(absPath)) throw new Error(`'${path}' does not exists`);
    const file = fs.readFileSync(absPath, 'utf8');
  } catch(e) {
    throw e;
  }
  return file;
}

const getAbsPath = (filePath) => {
  return path.resolve(filePath);
}
