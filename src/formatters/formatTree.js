const indent = 4;

const getWhitespaces = (nesting, hasStatusSymbol = false) => {
  const whitespaceQuantity = nesting * indent;
  return ' '.repeat(whitespaceQuantity - (hasStatusSymbol ? 2 : 0));
};

const stringifyObject = (object, nesting) => {
  const properties = Object.entries(object).reduce(
    (acc, [key, value]) => `${acc}${getWhitespaces(nesting)}${key}: ${value}\n`,
    '',
  );
  return `{\n${properties}${getWhitespaces(nesting - 1)}}`;
};

const stringifyValue = (value, nesting) => `${!(value instanceof Array) && value instanceof Object ? stringifyObject(value, nesting + 1) : value}`;

const stringify = {
  added: ({ key, valueAfter }, nesting) => `${getWhitespaces(nesting, true)}+ ${key}: ${stringifyValue(valueAfter, nesting)}\n`,
  removed: ({ key, valueBefore }, nesting) => `${getWhitespaces(nesting, true)}- ${key}: ${stringifyValue(valueBefore, nesting)}\n`,
  unchanged: ({ key, value }, nesting) => `${getWhitespaces(nesting)}${key}: ${stringifyValue(value, nesting)}\n`,
  changed: ({ key, valueBefore, valueAfter }, nesting) => `${stringify.removed({ key, valueBefore }, nesting)}${stringify.added({ key, valueAfter }, nesting)}`,
  parent: ({ key }, nesting) => `${getWhitespaces(nesting)}${key}: `,
};

export default (ast) => {
  const iter = (internalDiff, nesting) => {
    const result = internalDiff.reduce((acc, item) => {
      const newAcc = `${acc}${stringify[item.status](item, nesting)}`;
      return item.children instanceof Array ? `${newAcc}${iter(item.children, nesting + 1)}` : newAcc;
    },
    '');
    return `{\n${result}${getWhitespaces(nesting - 1)}}\n`;
  };

  return iter(ast, 1).trim();
};
