import _ from 'lodash';

const isStr = (value) => value instanceof String ? `'${value}'` : value;

const checkObject = (value) => {
  const result = _.isObject(value) ? '[complex value]' : `${isStr(value)}`;
  return result;
};

const plain = (diff) => {
  const iter = (node, path) => {
    const filteredNode = node.filter((elem) => elem.type !== 'unchanged');
    const result = filteredNode.flatMap((elem) => {
      const newPath = path === '' ? elem.name : `${path}.${elem.name}`;
      switch (elem.type) {
        case 'nested': {
          return iter(elem.children, newPath);
        }
        case 'added': {
          return `Property '${newPath}' was added with value: ${checkObject(elem.value)}`;
        }
        case 'deleted': {
          return `Property '${newPath}' was removed`;
        }
        case 'changed': {
          return `Property '${newPath}' was updated. From ${checkObject(elem.old)} to ${checkObject(elem.new)}`;
        }
        default:
          throw new Error(`Unsupported element type ${elem.type}`);
      }
    }, '');
    return result.join('\n');
  };
  return iter(diff, '');
};

export default plain;
