import _ from 'lodash';

const addObjectToDiff = (diff, status, key, value, nesting = 1) => [...diff, {
  status,
  key,
  value,
  nesting,
}];

const addParentToDiff = (diff, status, key, children, nesting = 1) => [...diff, {
  status,
  key,
  children,
  nesting,
}];

const build = (data1, data2, acc = [], nesting = 1) => {
  const intermediateResult = Object.keys(data1).reduce((accIter, key) => {
    const firstValue = data1[key];
    const secondValue = data2[key];
    if (!_.has(data2, key)) {
      return addObjectToDiff(accIter, 'removed', key, firstValue, nesting);
    }

    if (firstValue === secondValue) {
      return addObjectToDiff(accIter, 'unchanged', key, firstValue, nesting);
    }

    if (!(data1[key] instanceof Object) || !(data2[key] instanceof Object)) {
      return addObjectToDiff(
        addObjectToDiff(accIter, 'removed', key, firstValue, nesting),
        'added',
        key,
        secondValue,
        nesting,
      );
    }

    const children = build(data1[key], data2[key], [], nesting + 1);
    return addParentToDiff(accIter, 'parent', key, children, nesting);
  },
  acc);

  return Object.keys(data2).reduce((accIter, key) => {
    const value = data2[key];
    return _.has(data1, key) ? accIter : addObjectToDiff(accIter, 'added', key, value, nesting);
  }, intermediateResult);
};

export default build;
