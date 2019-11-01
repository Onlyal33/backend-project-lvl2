import fs from 'fs';
import gendiff from '../src';

const getPath = (fileName) => `${__dirname}/__fixtures__/${fileName}`;

const result = fs.readFileSync(getPath('result.txt'), 'utf8').trim();

test.each([
  ['before.json', 'after.json', result],
  ['before.yml', 'after.yml', result],
  ['before.ini', 'after.ini', result],
])(
  'default output',
  (fileName1, fileName2, expected) => {
    const received = gendiff(getPath(fileName1), getPath(fileName2), 'tree');
    expect(received).toBe(expected);
  },
);

const plainResult = fs.readFileSync(getPath('plainResult.txt'), 'utf8').trim();

test.each([
  ['before.json', 'after.json', plainResult],
  ['before.yml', 'after.yml', plainResult],
  ['before.ini', 'after.ini', plainResult],
])(
  'output in plain text format',
  (fileName1, fileName2, expected) => {
    const received = gendiff(getPath(fileName1), getPath(fileName2), 'plain');
    expect(received).toBe(expected);
  },
);

const jsonResult = fs.readFileSync(getPath('result.json'), 'utf8').trim();

test.each([
  ['before.json', 'after.json', jsonResult],
  ['before.yml', 'after.yml', jsonResult],
  ['before.ini', 'after.ini', jsonResult],
])(
  'output in json format',
  (fileName1, fileName2, expected) => {
    const received = gendiff(getPath(fileName1), getPath(fileName2), 'json');
    expect(received).toBe(expected);
  },
);
