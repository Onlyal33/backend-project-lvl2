import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import build from './build';
import formatTree from './formatters/formatTree';
import formatPlain from './formatters/formatPlain';
import formatJSON from './formatters/formatJSON';

const parseConfig = (data, extension) => {
  const [parser] = parsers.filter((parserType) => parserType.check(extension));
  return parser.func(data);
};

const getFormat = {
  tree: formatTree,
  plain: formatPlain,
  json: formatJSON,
};

export default (path1, path2, format) => {
  const config1 = parseConfig(fs.readFileSync(path1, 'utf-8'), path.extname(path1));
  const config2 = parseConfig(fs.readFileSync(path2, 'utf-8'), path.extname(path2));
  const ast = build(config1, config2);
  return getFormat[format](ast);
};
