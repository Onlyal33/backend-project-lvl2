import _ from 'lodash';

const stringifyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  return Number.isNaN(Number(value)) ? `'${value}'` : `${value}`;
};

const stringify = {
  added: ({ key, valueAfter }, path) => `Property '${path}${key}' was added with value: ${stringifyValue(valueAfter)}`,
  removed: ({ key }, path) => `Property '${path}${key}' was removed`,
  changed: ({ key, valueBefore, valueAfter }, path) => `Property '${path}${key}' was updated. From ${stringifyValue(valueBefore)} to ${stringifyValue(valueAfter)}`,
};

export default (ast) => {
  const iter = (array, path) => {
    const result = array.reduce((acc, item) => {
      const newAcc = (item.status === 'unchanged' || item.status === 'parent')
        ? acc
        : [...acc, stringify[item.status](item, path)];
      return item.children instanceof Array ? [...newAcc, iter(item.children, `${path}${item.key}.`)] : newAcc;
    },
    []);
    return result;
  };

  return _.flattenDeep(iter(ast, '')).join('\n');
};
