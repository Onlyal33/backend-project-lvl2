import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return Number.isNaN(Number(value)) ? `'${value}'` : value;
};

const stringify = {
  added: ({ key, valueAfter }, path) => `Property '${path}${key}' was added with value: ${stringifyValue(valueAfter)}`,
  removed: ({ key }, path) => `Property '${path}${key}' was removed`,
  changed: ({ key, valueBefore, valueAfter }, path) => `Property '${path}${key}' was updated. From ${stringifyValue(valueBefore)} to ${stringifyValue(valueAfter)}`,
  unchanged: () => null,
  parent: ({ key, children }, path, func) => func(children, `${path}${key}.`),
};

export default (ast) => {
  const iter = (array, path) => array.map((item) => stringify[item.type](item, path, iter));
  return _.flattenDeep(iter(ast, ''))
    .filter((item) => item !== null)
    .join('\n');
};
