import stylish from './stylish.js';
import plain from './plain.js';

const render = (diff, formatter) => {
  switch (formatter) {
    case 'json': {
      return JSON.stringify(diff, null, 4);
    }
    case 'plain': {
      return plain(diff);
    }
    default:
      return stylish(diff);
  }
};

export default render;
