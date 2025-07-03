import arg from 'arg';
import { Dictionary } from './types';

const args = arg(
  {
    '--from': Number,

    '--to': Number,

    '--debug': Boolean,
    '-d': '--debug',

    '--calculate-boundaries': Boolean,
    '-b': '--calculate-boundaries',

    '--help': Boolean,
    '-h': '--help',
  },
  {
    argv: process.argv.slice(2),
    permissive: true,
  }
);

export const params = {
  from: args['--from'],
  to: args['--to'],
  debug: args['--debug'],
  calculateBoundaries: args['--calculate-boundaries'],
  help: args['--help'],
  dictionaries: args._.filter((name: string) =>
    ['ancient', 'vygus', 'hieroes'].includes(name)
  ) as Dictionary[],
};

const showHelp = () => {
  console.log('PDF Dictionary Parser');
  console.log(
    'Extracts information from PDF files of following types - ancient, vygus, heroes'
  );
  console.log();
  console.log('Usage:');
  console.log('\tnpm run parse-dictionary -- name [options]');
  console.log(' or');
  console.log('\tnpm run parse-dictionary -- name1 name2 [--debug]');
  console.log('Options:');
  console.log('\t--from <number>               First page to process');
  console.log('\t--to <number>                 Last page to process');
  console.log('\t-d, --debug                   Enable debug mode');
  console.log(
    '\t-b, --calculate-boundaries    Only print columns boundaries'
  );
  console.log();
  console.log('Examples:');
  console.log('\t# Process all the dictionaries');
  console.log('\tnpm run parse-dictionary -- ancient vygus heroes');
  console.log();
  console.log("\t# Process 'ancient' dictionary from page 2 to 5 with debug");
  console.log('\tnpm run parse-dictionary -- ancient --from=2 --to=5 --debug');
  console.log('\tnpm run parse-dictionary -- ancient --from=2 --to=5 -d');
  console.log();
  console.log("\t# Calculates the ancient's boundaries from page 2 to 5");
  console.log(
    '\tnpm run parse-dictionary -- ancient --from=2 --to=5 --calculate-boundaries'
  );
  console.log('\tnpm run parse-dictionary -- ancient --from=2 --to=5 -b');
  console.log();
};

if (params.help || !params.dictionaries.length) {
  showHelp();
  process.exit(1);
}

if (params.dictionaries.length > 1) {
  (['from', 'to', 'calculateBoundaries'] as (keyof typeof params)[]).forEach(
    (name) => {
      if (params[name]) {
        console.warn(`warning: option '${name}' is ignored for multiply dictionaries`);
        (params[name] as unknown) = undefined;
      }
    }
  );
}

if (params.calculateBoundaries && params.debug) {
  console.warn(`warning: option 'debug' is ignored in calculateBoundaries mode`);
  params.debug = undefined;
}
