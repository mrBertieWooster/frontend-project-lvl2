import _ from 'lodash';
import parser from './parsers.js';
import stylish from './formatters.js';

const getUniqueKeys = (obj1, obj2) => {
  if (_.isObject(obj1) && _.isObject(obj2)) {
    return _.sortedUniq(_.concat(Object.keys(obj1), Object.keys(obj2)).sort());
  }
  if (_.isObject(obj1)) return _.sortedUniq(Object.keys(obj1).sort());
  return _.sortedUniq(Object.keys(obj2).sort());
};

const makeDiff = (file1, file2) => {
  const iter = (obj1, obj2, deepLevel) => {
    const uniqueKeys = getUniqueKeys(obj1, obj2);
    const result = uniqueKeys.reduce((acc, key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(obj1[key])) {
          return [...acc, {
            name: key, type: 'nested', status: 'unchanged', deepLevel, children: iter(obj1[key], obj2[key], deepLevel + 1),
          }];
        }
        if ((obj1[key] === obj2[key])) {
          return [...acc, {
            name: key, value: obj1[key], status: 'unchanged', deepLevel,
          }];
        }
        return [...acc, {
          name: key, status: 'changed', old: obj1[key], new: obj2[key], deepLevel,
        }];
      }
      if (_.has(obj1, key)) {
        if (_.isObject(obj1[key])) {
          return [...acc, {
            name: key, type: 'nested', status: 'deleted', deepLevel, children: iter(obj1[key], null, deepLevel + 1),
          }];
        }
        return [...acc, {
          name: key, status: 'deleted', value: obj1[key], deepLevel,
        }];
      }
      if (_.isObject(obj2[key])) {
        return [...acc, {
          name: key, type: 'nested', status: 'added', deepLevel, children: iter(null, obj2[key], deepLevel + 1),
        }];
      }
      return [...acc, {
        name: key, status: 'added', value: obj2[key], deepLevel,
      }];
    }, []);
    return result;
  };
  return stylish(iter(file1, file2, 0));
};

export default (path1, path2) => {
  const firstFile = parser(path1);
  const secondFile = parser(path2);
  const result = makeDiff(firstFile, secondFile);
  return result;
};
