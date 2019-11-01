import _ from 'lodash';

const nodeTypes = [
  {
    action: (diff, key, valueBefore, valueAfter) => [...diff, { status: 'added', key, valueAfter }],
    check: (data1, data2, key) => _.has(data2, key) && !_.has(data1, key),
    childAction: _.identity,
  },
  {
    action: (diff, key, valueBefore) => [...diff, { status: 'removed', key, valueBefore }],
    check: (data1, data2, key) => _.has(data1, key) && !_.has(data2, key),
    childAction: _.identity,
  },
  {
    action: (diff, key, value) => [...diff, { status: 'unchanged', key, value }],
    check: (data1, data2, key) => data1[key] === data2[key],
    childAction: _.identity,
  },
  {
    action: (diff, key, children) => [...diff, { status: 'parent', key, children }],
    check: (data1, data2, key) => (_.isObject(data1[key]) && _.isObject(data2[key])),
    childAction: (data1, data2, func) => func(data1, data2),
  },
  {
    action: (diff, key, valueBefore, valueAfter) => [...diff, {
      status: 'changed',
      key,
      valueBefore,
      valueAfter,
    }],
    check: (data1, data2, key) => data1[key] !== data2[key],
    childAction: _.identity,
  },
];

const build = (data1, data2, acc = []) => _.union(Object.keys(data1), Object.keys(data2))
  .reduce((accIter, key) => {
    const [nodeType] = nodeTypes.filter(({ check }) => check(data1, data2, key));
    const value = nodeType.childAction(data1[key], data2[key], build);
    return nodeType.action(accIter, key, value, data2[key]);
  },
  acc);

export default build;
