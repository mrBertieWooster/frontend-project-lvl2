import _ from 'lodash';
import readFile from './utils.js';

const addToDiff = (diff, key, value, sign) => {
  const newKey = `${sign} ${key}`;
  const result = diff;
  result[newKey] = value;
  return diff;
};

const toString = (obj) => {
  let result = '';
  for (const property in obj) {
    result = `${result}\n  ${property}: ${obj[property]}`;
  }
  return `{${result}\n}`;
};

const makeDiff = (json1, json2) => {
  const sortedKeys = _.concat(Object.keys(json1), Object.keys(json2)).sort();
  const result = sortedKeys.reduce((acc, key) => {
    if (_.has(json1, key) && _.has(json2, key)) {
      if (json1[key] === json2[key]) {
        return addToDiff(acc, key, json1[key], ' ');
      }
      addToDiff(acc, key, json1[key], '-');
      addToDiff(acc, key, json2[key], '+');
      return acc;
    } else if (_.has(json1, key)) {
      return addToDiff(acc, key, json1[key], '-');
    } else {
      return addToDiff(acc, key, json2[key], '+');
    }
  }, {});
  return toString(result);
};

export default (path1, path2) => {
  console.log('getting diff');
  const firstJson = JSON.parse(readFile(path1));
  const secondJson = JSON.parse(readFile(path2));
  const result = makeDiff(firstJson, secondJson);
  return result;
};
