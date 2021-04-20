import _ from 'lodash';
import readFile from './utils.js';

const addToDiff = (diff, key, value, sign) => `${diff}\n  ${sign} ${key}: ${value}`;

const getUniqueKeys = (obj1, obj2) => {
  const sortedKeys = _.concat(Object.keys(obj1), Object.keys(obj2)).sort();
  return _.sortedUniq(sortedKeys);
};

const makeDiff = (json1, json2) => {
  const uniqueKeys = getUniqueKeys(json1, json2);
  const result = uniqueKeys.reduce((acc, key) => {
    if (_.has(json1, key) && _.has(json2, key)) {
      if ((json1[key] === json2[key])) {
        return addToDiff(acc, key, json1[key], ' ');
      }
      return addToDiff(addToDiff(acc, key, json1[key], '-'), key, json2[key], '+');
    }
    if (_.has(json1, key)) {
      return addToDiff(acc, key, json1[key], '-');
    }
    return addToDiff(acc, key, json2[key], '+');
  }, '');
  return `{${result}\n}`;
};

export default (path1, path2) => {
  const firstJson = JSON.parse(readFile(path1));
  const secondJson = JSON.parse(readFile(path2));
  const result = makeDiff(firstJson, secondJson);
  return result;
};
