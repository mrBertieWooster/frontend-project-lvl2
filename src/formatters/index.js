import stylish from './stylish.js';
import plain from './plain.js';

const render = (diff, formatter) => {
  switch (formatter) {
    case 'plain': {
      return plain(diff);
    }
    default:
      return stylish(diff);
  }
};

export default render;
