const indent = 4;

const renderObject = (object, nesting) => {
  const properties = Object.entries(object).reduce(
    (acc, [key, value]) => `${acc}${' '.repeat(nesting * indent)}${key}: ${value}\n`,
    '',
  );
  return `{\n${properties}${' '.repeat((nesting - 1) * indent)}}`;
};

const stringify = ({
  key,
  value,
  status,
  nesting,
}) => (status === 'parent'
  ? `${key}: `
  : `${key}: ${value instanceof Object ? renderObject(value, nesting + 1) : value}\n`);

const actions = {
  added: '+',
  removed: '-',
  unchanged: ' ',
  parent: ' ',
};

const render = (internalDiff, nesting = 1) => {
  const result = internalDiff.reduce((acc, item) => {
    const newAcc = `${acc}${' '.repeat(item.nesting * indent - 2)}${actions[item.status]} ${stringify(item)}`;
    return item.children instanceof Array ? `${newAcc}${render(item.children, nesting + 1)}` : newAcc;
  },
  '');
  return `{\n${result}${' '.repeat((nesting - 1) * indent)}}\n`;
};

export default render;
