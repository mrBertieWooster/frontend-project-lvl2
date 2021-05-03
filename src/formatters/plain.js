import _ from 'lodash';

const checkObject = (value) => {
  const result = _.isObject(value) ? '[complex value]' : value;
  return result;
};

const plain = (diff) => {
  const iter = (node, path) => {
    const result = node.flatMap((elem) => {
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
        case 'modified': {
          return `Property '${newPath}' was updated. From ${checkObject(elem.old)} to ${checkObject(elem.new)}`;
        }
        default:
          return `Property '${newPath}' was unchanged`;
      }
    }, '');
    return result.join('\n');
  };
  return iter(diff, '');
};

export default plain;
