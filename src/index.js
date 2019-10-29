import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers';

const getConfig = (data, format) => parsers[format](data);

const getTextProperty = (key, value) => `${key}: ${value}\n`;

const actions = {
  added: (string, key, value) => `${string} + ${getTextProperty(key, value)}`,
  removed: (string, key, value) => `${string} - ${getTextProperty(key, value)}`,
  changed: (string, key, value1, value2) => `${string} - ${getTextProperty(key, value1)} + ${getTextProperty(key, value2)}`,
  unchanged: (string, key, value) => `${string}   ${getTextProperty(key, value)}`,
};

const compareConfigs = (firstConfig, secondConfig) => {
  const intermediateResult = Object.keys(firstConfig).reduce((acc, key) => {
    const firstValue = firstConfig[key];
    const secondValue = secondConfig[key];
    let action = '';
    if (_.has(secondConfig, key)) {
      action = firstValue === secondValue ? 'unchanged' : 'changed';
    } else {
      action = 'removed';
    }
    return actions[action](acc, key, firstValue, secondValue);
  }, '{\n');
  return `${Object.keys(secondConfig).reduce((acc, key) => {
    const value = secondConfig[key];
    return _.has(firstConfig, key) ? acc : actions.added(acc, key, value);
  }, intermediateResult)}}`;
};

export default (firstPath, secondPath) => {
  const firstConfig = getConfig(fs.readFileSync(firstPath, 'utf-8'), path.extname(firstPath));
  const secondConfig = getConfig(fs.readFileSync(secondPath, 'utf-8'), path.extname(secondPath));
  return compareConfigs(firstConfig, secondConfig);
};
