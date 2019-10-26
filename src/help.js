import program from 'commander';
import { version, description } from '../package.json';

export default () => {
  program
    .version(version)
    .description(description)
    .parse(process.argv);
};
