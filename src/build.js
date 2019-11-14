import _ from 'lodash';

const nodeTypes = [
  {
    action: (key, valueBefore, valueAfter) => ({ status: 'added', key, valueAfter }),
    check: (data1, data2, key) => _.has(data2, key) && !_.has(data1, key),
  },
  {
    action: (key, valueBefore) => ({ status: 'removed', key, valueBefore }),
    check: (data1, data2, key) => _.has(data1, key) && !_.has(data2, key),
  },
  {
    action: (key, value) => ({ status: 'unchanged', key, value }),
    check: (data1, data2, key) => data1[key] === data2[key],
  },
  {
    action: (key, value1, value2, func) => ({ status: 'parent', key, children: func(value1, value2) }),
    check: (data1, data2, key) => (_.isObject(data1[key]) && _.isObject(data2[key])),
  },
  {
    action: (key, valueBefore, valueAfter) => ({
      status: 'changed',
      key,
      valueBefore,
      valueAfter,
    }),
    check: (data1, data2, key) => data1[key] !== data2[key],
  },
];

const build = (data1, data2) => _.union(Object.keys(data1), Object.keys(data2))
  .map((key) => {
    const [nodeType] = nodeTypes.filter(({ check }) => check(data1, data2, key));
    return nodeType.action(key, data1[key], data2[key], build);
  });

export default build;
