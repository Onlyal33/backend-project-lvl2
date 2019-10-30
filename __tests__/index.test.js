import fs from 'fs';
import gendiff from '../src';

const getPath = (fileName, subfolder = '') => `${__dirname}/__fixtures__/${subfolder}${fileName}`;

const flatResult = fs.readFileSync(getPath('__flat__/result'), 'utf8');

test.each([
  ['before.json', 'after.json', '__flat__/', flatResult],
  ['before.yml', 'after.yml', '__flat__/', flatResult],
  ['before.ini', 'after.ini', '__flat__/', flatResult],
])(
  'plain data',
  (fileName1, fileName2, subfolder, expected) => {
    expect(gendiff(getPath(fileName1, subfolder), getPath(fileName2, subfolder))).toBe(expected);
  },
);

const nestedResult = fs.readFileSync(getPath('__nested__/result'), 'utf8');

test.each([
  ['before.json', 'after.json', '__nested__/', nestedResult],
  ['before.yml', 'after.yml', '__nested__/', nestedResult],
  ['before.ini', 'after.ini', '__nested__/', nestedResult],
])(
  'nested data',
  (fileName1, fileName2, subfolder, expected) => {
    const received = gendiff(getPath(fileName1, subfolder), getPath(fileName2, subfolder));
    expect(received).toBe(expected);
  },
);
