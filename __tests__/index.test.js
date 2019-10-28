import fs from 'fs';
import gendiff from '../src';

const getPath = (fileName) => `${__dirname}/__fixtures__/${fileName}`;
test('plain json', () => {
  const result = fs.readFileSync(getPath('result'), 'utf8').trim();
  expect(gendiff(getPath('before.json'), getPath('after.json'))).toBe(result);
});
