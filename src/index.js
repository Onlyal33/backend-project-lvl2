import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import build from './build';
import formatters from './formatters';

const dataTypes = {
  '.json': 'json',
  '.yml': 'yaml',
  '.yaml': 'yaml',
  '.ini': 'ini',
};

const getDataType = (extension) => dataTypes[extension];

export default (path1, path2, format) => {
  const config1 = parsers(getDataType(path.extname(path1)))(fs.readFileSync(path1, 'utf-8'));
  const config2 = parsers(getDataType(path.extname(path2)))(fs.readFileSync(path2, 'utf-8'));
  const ast = build(config1, config2);
  return formatters(format)(ast);
};
