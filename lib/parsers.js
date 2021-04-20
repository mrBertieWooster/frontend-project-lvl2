import { extname } from 'path';
import yaml from 'js-yaml';
import readFile from './utils.js';

export default (fileName) => {
  const strFile = readFile(fileName);
  const fileExt = extname(fileName);
  switch (fileExt) {
    case '.json':
      return JSON.parse(strFile);
    case '.yml':
    case '.yaml':
      return yaml.load(strFile);
    default:
      throw new Error('unsupported file extension');
  }
};
