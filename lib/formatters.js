import _ from 'lodash';

const unchanged = ' ';
const deleted = '-';
const added = '+';
const tabulation = '    ';
const currentTab = (deepLevel) => tabulation.repeat(deepLevel);

const toString = (key, value, sign, deep) => `${currentTab(deep)}${sign} ${key}: ${value}`;

const objToString = (value, deep) => {
  const objAsIs = (obj, deepLevel) => {
    const objKeys = Object.keys(obj);
    const strValue = objKeys.reduce((acc, key) => {
      const childValue = !_.isObject(value[key]) ? obj[key]
        : objToString(value[key], deepLevel + 1);
      return `${acc}\n${currentTab(deepLevel + 1)}  ${key}: ${childValue}`;
    }, '');
    return `{${strValue}\n${currentTab(deepLevel)}  }`;
  };
  return !_.isObject(value) ? value : objAsIs(value, deep);
};

const format = (node, func, deepLevel) => {
  switch (node.type) {
    case 'nested': {
      const childrenValue = func(node.children, deepLevel);
      return toString(node.name, childrenValue, unchanged, deepLevel);
    }
    case 'added': {
      return toString(node.name, objToString(node.value, deepLevel), added, deepLevel);
    }
    case 'deleted': {
      return toString(node.name, objToString(node.value, deepLevel), deleted, deepLevel);
    }
    case 'changed': {
      const oldValue = toString(node.name, objToString(node.old, deepLevel), deleted, deepLevel);
      const newValue = toString(node.name, objToString(node.new, deepLevel), added, deepLevel);
      return `${oldValue}\n${newValue}`;
    }
    default: {
      return toString(node.name, objToString(node.value), unchanged, deepLevel);
    }
  }
};

const stylish = (ast) => {
  const iter = (tree, deepLevel) => {
    const processedTree = tree.flatMap((elem) => format(elem, iter, deepLevel + 1));
    const result = processedTree.join('\n');
    return deepLevel === 0 ? `{\n${result}\n${currentTab(deepLevel)}}` : `{\n${result}\n${currentTab(deepLevel)}  }`;
  };
  return iter(ast, 0);
};

const render = (diff, formatter) => {
  switch (formatter) {
    case 'stylish': {
      return stylish(diff);
    }
    default:
      return stylish(diff);
  }
};

export default render;
