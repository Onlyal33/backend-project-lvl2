import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import build from './build';
import formatters from './formatters';

const parseConfig = (data, extension) => parsers[extension](data);

export default (path1, path2, format) => {
  const config1 = parseConfig(fs.readFileSync(path1, 'utf-8'), path.extname(path1));
  const config2 = parseConfig(fs.readFileSync(path2, 'utf-8'), path.extname(path2));
  const ast = build(config1, config2);
  return formatters[format](ast);
};
