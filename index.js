#!/usr/bin/env node

const promisify = require('util').promisify;
const fs = require('fs');
const exec = promisify(require('child_process').exec);
const rimraf = promisify(require('rimraf'));
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

Spinner.setDefaultSpinnerString(18);

const ARGUMENT_DEFINITITIONS = {
  verbose: {
    argument: ['--verbose'],
    default: false,
    description: 'Print options and steps taken.',
  },
  clean: {
    argument: ['--clean', '-C'],
    default: false,
    description: 'Clean Yarn/npm cache.',
  },
  'skip-install': {
    argument: ['--skip-install'],
    default: false,
    description: 'Do not reinstall node_modules.',
  },
  yarn: {
    argument: ['yom', '--yarn', '-Y'],
    default: false,
    description: 'Force Yarn over npm.',
  },
  npm: {
    argument: ['nom', '--npm', '-N'],
    default: false,
    description: 'Force npm over Yarn.',
  },
  help: {
    argument: ['help', '--help'],
    default: false,
    description: 'Print this help for arguments.',
  },
};

// default options
let OPTIONS = {
  help: false,
  verbose: false,
  clean: false,
  'skip-install': false,
  yarn: false,
  npm: false,
};

const go = async (options) => {
  if (options.help) {
    console.table(ARGUMENT_DEFINITITIONS);
    return;
  }

  if (!options.npm && !options.yarn) {
    if (options.verbose) console.log('Determining project type.');
    options.npm = fs.existsSync('./package-lock.json');
    options.yarn = fs.existsSync('./yarn.lock');
  }

  if (!options.npm && !options.yarn) {
    console.log(
      chalk.white.bgRed.bold(
        ' Please use "--npm" or "--yarn" with first nomming. ',
      ),
    );
    return;
  }

  const cleanCmd = options.yarn ? 'yarn cache clean' : 'npm cache verify';
  const installCmd = options.yarn ? 'yarn install' : 'npm install';
  let success = false;
  let nomSpinner = false;

  if (!options.verbose) {
    nomSpinner = new Spinner(`${chalk.bold.magenta('nom nom nom')} %s`);
    nomSpinner.start();
  } else {
    console.log('Proceeding with these settings:');
    console.table(options);
    console.log(chalk.cyan('Deleting:'), chalk.bold('node_modules'));
  }

  try {
    await rimraf('./node_modules');

    if (options.clean) {
      if (options.verbose)
        console.log(chalk.cyan('Cleaning:'), chalk.bold.white(cleanCmd));
      await exec(cleanCmd);
    }

    if (!options['skip-install']) {
      if (options.verbose)
        console.log(chalk.cyan('Reinstalling:'), chalk.bold.white(installCmd));
      await exec(installCmd);
    }

    success = true;
  } catch (error) {
    console.error(error);
  }

  if (nomSpinner) nomSpinner.stop(true);

  if (success) console.log(chalk.bold.white.bgGreen(' NOMMED! '));
  else
    console.log(chalk.white.bgRed.bold(` Nomming error! Run "${installCmd}" `));
};

let run = true;
let message = null;
let ARGUMENTS_LIST = [];
for (const def in ARGUMENT_DEFINITITIONS) {
  ARGUMENTS_LIST = ARGUMENTS_LIST.concat(ARGUMENT_DEFINITITIONS[def].argument);
}

process.argv.slice(2).forEach((arg) => {
  if (ARGUMENTS_LIST.indexOf(arg) >= 0) {
    // update options
    for (const def in ARGUMENT_DEFINITITIONS) {
      if (ARGUMENT_DEFINITITIONS[def].argument.indexOf(arg) >= 0)
        OPTIONS[def] = true;
    }
  } else {
    message = ` Unknown argument: "${arg}". Run "nomyom help". Aborting. `;
    run = false;
  }
});

if (run) go(OPTIONS);
else if (message) console.log(chalk.white.bgRed.bold(message));
else
  console.log(
    chalk.white.bgRed.bold(
      ' Unknown error. Please report at github.com/tbeseda/nomyom ',
    ),
  );
