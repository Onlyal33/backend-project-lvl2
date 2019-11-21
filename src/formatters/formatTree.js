import _ from 'lodash';

const indent = 4;

const getWhitespaces = (depth, sign = ' ') => {
  if (depth === 0) {
    return '';
  }
  const whitespaceQuantity = depth * indent - 2;
  return `${' '.repeat(whitespaceQuantity)}${sign} `;
};

const stringifyProperty = (key, value, depth, sign) => `${getWhitespaces(depth, sign)}${key}: ${value}`;

const stringifyArrayOfRenderedProperties = (array, depth) => `{\n${array.join('\n')}\n${getWhitespaces(depth - 1)}}`;

const renderObject = (object, depth) => {
  const properties = Object.entries(object).map(
    ([key, value]) => stringifyProperty(key, value, depth),
  );
  return stringifyArrayOfRenderedProperties(properties, depth);
};

const renderProperty = (key, value, depth, sign) => {
  const renderedValue = _.isPlainObject(value) ? renderObject(value, depth + 1) : value;
  return stringifyProperty(key, renderedValue, depth, sign);
};

const stringify = {
  added: ({ key, valueAfter }, depth) => renderProperty(key, valueAfter, depth, '+'),
  removed: ({ key, valueBefore }, depth) => renderProperty(key, valueBefore, depth, '-'),
  unchanged: ({ key, value }, depth) => renderProperty(key, value, depth),
  changed: ({ key, valueBefore, valueAfter }, depth) => `${stringify.removed({ key, valueBefore }, depth)}\n${stringify.added({ key, valueAfter }, depth)}`,
  parent: ({ key, children }, depth, f) => renderProperty(key, f(children, depth + 1), depth),
};

export default (ast) => {
  const iter = (array, depth) => {
    const result = array.map((item) => stringify[item.type](item, depth, iter));
    return stringifyArrayOfRenderedProperties(result, depth);
  };

  return iter(ast, 1);
};
