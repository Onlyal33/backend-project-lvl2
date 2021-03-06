import fs from 'fs';
import gendiff from '../src';

const getPath = (fileName) => `${__dirname}/../__fixtures__/${fileName}`;
const testDataset = [
  ['before.json', 'after.json'],
  ['before.yml', 'after.yml'],
  ['before.ini', 'after.ini'],
];

test.each(testDataset)(
  'default output',
  (fileName1, fileName2) => {
    const expected = fs.readFileSync(getPath('result.txt'), 'utf8').trim();
    const received = gendiff(getPath(fileName1), getPath(fileName2), 'tree');
    expect(received).toBe(expected);
  },
);

test.each(testDataset)(
  'output in plain text format',
  (fileName1, fileName2) => {
    const expected = fs.readFileSync(getPath('plainResult.txt'), 'utf8').trim();
    const received = gendiff(getPath(fileName1), getPath(fileName2), 'plain');
    expect(received).toBe(expected);
  },
);

test.each(testDataset)(
  'output in json format',
  (fileName1, fileName2) => {
    const expected = fs.readFileSync(getPath('result.json'), 'utf8').trim();
    const received = gendiff(getPath(fileName1), getPath(fileName2), 'json');
    expect(received).toBe(expected);
  },
);
