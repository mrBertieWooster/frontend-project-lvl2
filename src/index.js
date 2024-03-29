import _ from 'lodash';
// import sort from 'lodash/fp';
import parser from './parsers.js';
import render from './formatters/index.js';

const getUniqueKeys = (obj1, obj2) => {
  if (_.isObject(obj1) && _.isObject(obj2)) {
    const unionArrays = _.concat(Object.keys(obj1), Object.keys(obj2));
    return _.sortedUniq(_.sortBy(unionArrays));
  }
  if (_.isObject(obj1)) return _.sortedUniq(_.sortBy(Object.keys(obj1)));
  return _.sortedUniq(_.sortBy(Object.keys(obj2)));
};

const makeDiff = (file1, file2) => {
  const iter = (obj1, obj2, deepLevel) => {
    const uniqueKeys = getUniqueKeys(obj1, obj2);
    const result = uniqueKeys.reduce((acc, key) => {
      if (_.has(obj1, key) && _.has(obj2, key) && _.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return [...acc, {
          name: key, type: 'nested', deepLevel: deepLevel + 1, children: iter(obj1[key], obj2[key]),
        }];
      }
      if (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] === obj2[key])) {
        return [...acc, {
          name: key, value: obj1[key], type: 'unchanged', deepLevel,
        }];
      }
      if (_.has(obj1, key) && _.has(obj2, key) && (obj1[key] !== obj2[key])) {
        return [...acc, {
          name: key, type: 'changed', old: obj1[key], new: obj2[key], deepLevel,
        }];
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return [...acc, {
          name: key, type: 'deleted', value: obj1[key], deepLevel,
        }];
      }
      return [...acc, {
        name: key, type: 'added', value: obj2[key], deepLevel,
      }];
    }, []);
    return result;
  };
  return iter(file1, file2, 1);
};

export default (path1, path2, formatter) => {
  const firstFile = parser(path1);
  const secondFile = parser(path2);
  const diff = makeDiff(firstFile, secondFile);
  const result = render(diff, formatter);
  return result;
};
