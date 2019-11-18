import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildAST from './ASTbuilder';
import format from './formatters';

const getInputFormat = (extension) => extension.slice(1);

export default (path1, path2, outputFormat) => {
  const inputFormat1 = getInputFormat(path.extname(path1));
  const inputFormat2 = getInputFormat(path.extname(path2));
  const config1 = parse(inputFormat1)(fs.readFileSync(path1, 'utf-8'));
  const config2 = parse(inputFormat2)(fs.readFileSync(path2, 'utf-8'));
  const ast = buildAST(config1, config2);
  return format(outputFormat)(ast);
};
