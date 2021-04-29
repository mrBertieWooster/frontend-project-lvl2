const unchanged = '  ';
const deleted = '- ';
const added = '+ ';
const tabulation = '    ';
const currentTab = (deepLevel) => tabulation.repeat(deepLevel);

const format = (node, func) => {
  const deep = currentTab(node.deepLevel);
  switch (node.status) {
    case 'unchanged': {
      if (node.type === 'nested') {
        return `${deep}${unchanged}${node.name}: {\n${func(node.children)}`;
      }
      return `${deep}${unchanged}${node.name}: ${node.value}`;
    }
    case 'added': {
      if (node.type === 'nested') {
        return `${deep}${added}${node.name}: {\n${func(node.children)}`;
      }
      return `${deep}${added}${node.name}: ${node.value}`;
    }
    case 'deleted': {
      if (node.type === 'nested') {
        return `${deep}${deleted}${node.name}: {\n${func(node.children)}`;
      }
      return `${deep}${deleted}${node.name}: ${node.value}`;
    }
    case 'changed': {
      const oldValue = `${deep}${deleted}${node.name}: ${node.old}\n`;
      const newValue = `${deep}${added}${node.name}: ${node.new}`;
      return `${oldValue}${newValue}`;
    }
    default: {
      const curKey = `${deep}${unchanged}${node.name}: {\n`;
      const child = func(node.children);
      return `${curKey}${child}\n${currentTab(node.deepLevel)}}`;
    }
  }
};

const stylish = (ast) => {
  const result = ast.flatMap((elem) => format(elem, stylish));
  return result.join('\n');
  // return result;
};

export default stylish;
