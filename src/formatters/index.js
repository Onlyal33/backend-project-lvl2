import formatTree from './formatTree';
import formatPlain from './formatPlain';
import formatJSON from './formatJSON';

const formatters = {
  tree: formatTree,
  plain: formatPlain,
  json: formatJSON,
};

export default (format) => (data) => formatters[format](data);
