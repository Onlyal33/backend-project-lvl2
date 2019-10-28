import program from 'commander';
import { version, description } from '../package.json';

export default () => {
  program
    .version(version)
    .description(description)
    .option('-f, --format [type]', 'Output format')
    .arguments('<firstConfig> <secondConfig>')
    .action((firstConfig, secondConfig) => {
    })
    .parse(process.argv);
};
