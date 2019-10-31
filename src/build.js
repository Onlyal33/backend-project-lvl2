import _ from 'lodash';

const addToDiff = {
  added: (diff, key, valueAfter) => [...diff, { status: 'added', key, valueAfter }],
  removed: (diff, key, valueBefore) => [...diff, { status: 'removed', key, valueBefore }],
  unchanged: (diff, key, value) => [...diff, { status: 'unchanged', key, value }],
  changed: (diff, key, valueBefore, valueAfter) => [...diff, {
    status: 'changed',
    key,
    valueBefore,
    valueAfter,
  }],
  parent: (diff, key, children) => [...diff, { status: 'parent', key, children }],
};

const build = (data1, data2, acc = []) => {
  const intermediateResult = Object.keys(data1).reduce((accIter, key) => {
    const valueBefore = data1[key];
    const valueAfter = data2[key];
    if (!_.has(data2, key)) {
      return addToDiff.removed(accIter, key, valueBefore);
    }

    if (valueBefore === valueAfter) {
      return addToDiff.unchanged(accIter, key, valueBefore);
    }

    if (!(data1[key] instanceof Object) || !(data2[key] instanceof Object)) {
      return addToDiff.changed(accIter, key, valueBefore, valueAfter);
    }

    const children = build(data1[key], data2[key], []);
    return addToDiff.parent(accIter, key, children);
  },
  acc);

  return Object.keys(data2).reduce((accIter, key) => {
    const value = data2[key];
    return _.has(data1, key) ? accIter : addToDiff.added(accIter, key, value);
  }, intermediateResult);
};

export default build;
