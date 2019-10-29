import fs from 'fs';
import gendiff from '../src';

const getPath = (fileName) => `${__dirname}/__fixtures__/${fileName}`;
const result = fs.readFileSync(getPath('result'), 'utf8').trim();

test.each([
  ['before.json', 'after.json', result],
  ['before.yml', 'after.yml', result],
  ['before.ini', 'after.ini', result],
])(
  'plain format',
  (fileName1, fileName2, expected) => {
    expect(gendiff(getPath(fileName1), getPath(fileName2))).toBe(expected);
  },
);
