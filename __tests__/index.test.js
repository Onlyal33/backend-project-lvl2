import fs from 'fs';
import gendiff from '../src';

const getPath = (fileName) => `${__dirname}/__fixtures__/${fileName}`;
const result = fs.readFileSync(getPath('result'), 'utf8').trim();

test('plain json', () => {
  expect(gendiff(getPath('before.json'), getPath('after.json'))).toBe(result);
});

test('plain yaml', () => {
  expect(gendiff(getPath('before.yml'), getPath('after.yml'))).toBe(result);
});
