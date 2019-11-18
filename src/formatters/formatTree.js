import _ from 'lodash';

const indent = 4;

const getWhitespaces = (nesting, sign = ' ') => {
  if (nesting === 0) {
    return '';
  }
  const whitespaceQuantity = nesting * indent - 2;
  return `${' '.repeat(whitespaceQuantity)}${sign} `;
};

const stringifyProperty = (key, value, nesting, sign) => `${getWhitespaces(nesting, sign)}${key}: ${value}`;

const stringifyArrayOfRenderedProperties = (array, nesting) => `{\n${array.join('\n')}\n${getWhitespaces(nesting - 1)}}`;

const renderObject = (object, nesting) => {
  const properties = Object.entries(object).map(
    ([key, value]) => stringifyProperty(key, value, nesting),
  );
  return stringifyArrayOfRenderedProperties(properties, nesting);
};

const renderProperty = (key, value, nesting, sign) => {
  const renderedValue = _.isPlainObject(value) ? renderObject(value, nesting + 1) : value;
  return stringifyProperty(key, renderedValue, nesting, sign);
};

const stringify = {
  added: ({ key, valueAfter }, nesting) => renderProperty(key, valueAfter, nesting, '+'),
  removed: ({ key, valueBefore }, nesting) => renderProperty(key, valueBefore, nesting, '-'),
  unchanged: ({ key, value }, nesting) => renderProperty(key, value, nesting),
  changed: ({ key, valueBefore, valueAfter }, nesting) => `${stringify.removed({ key, valueBefore }, nesting)}\n${stringify.added({ key, valueAfter }, nesting)}`,
  parent: ({ key, children }, nesting, f) => renderProperty(key, f(children, nesting + 1), nesting),
};

export default (ast) => {
  const iter = (array, nesting) => {
    const result = array.map((item) => stringify[item.type](item, nesting, iter));
    return stringifyArrayOfRenderedProperties(result, nesting);
  };

  return iter(ast, 1);
};
