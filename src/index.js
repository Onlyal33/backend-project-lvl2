import _ from 'lodash';
import fs from 'fs';

const readFile = (path) => fs.readFileSync(path);
const getConfig = (data) => JSON.parse(data);
const getTextProperty = (key, value) => `${key}: ${value}\n`;

export default (firstPath, secondPath) => {
  const firstConfig = getConfig(readFile(firstPath));
  const secondConfig = getConfig(readFile(secondPath));
  const halfResult = Object.keys(firstConfig).reduce((acc, key) => {
    const firstValue = firstConfig[key];
    if (_.has(secondConfig, key)) {
      const secondValue = secondConfig[key];
      return firstValue === secondValue
        ? `${acc}   ${getTextProperty(key, firstValue)}`
        : `${acc} - ${getTextProperty(key, firstValue)} + ${getTextProperty(key, secondValue)}`;
    }
    return `${acc} - ${getTextProperty(key, firstValue)}`;
  }, '{\n');
  return `${Object.keys(secondConfig).reduce((acc, key) => {
    const value = secondConfig[key];
    return _.has(firstConfig, key) ? acc : `${acc} + ${getTextProperty(key, value)}`;
  }, halfResult)}}`;
};
