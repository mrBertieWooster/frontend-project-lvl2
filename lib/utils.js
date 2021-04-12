import * as fs from 'fs/promises';

export const readFile = (path) => {
  if (!fs.existsSync) throw new Error(`${path} does not exists`);
  const file = fs.readFileSync(path, 'utf8');
  return file;
}
