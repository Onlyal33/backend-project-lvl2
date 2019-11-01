import yaml from 'js-yaml';
import ini from 'ini';

export default [
  { func: (data) => JSON.parse(data), check: (ext) => ext === '.json' },
  { func: (data) => yaml.safeLoad(data), check: (ext) => ext === '.yml' },
  { func: (data) => ini.parse(data), check: (ext) => ext === '.ini' },
  { func: () => '', check: (ext) => ext },
];
