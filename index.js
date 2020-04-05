#!/usr/bin/env node

const promisify = require('util').promisify;
const exec = promisify(require('child_process').exec);
const rimraf = promisify(require('rimraf'));
const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;

// default options
let options = {
  verbose: false,
  yarn: false,
  clean: false,
  reinstall: true,
};

Spinner.setDefaultSpinnerString(18);

const go = async (options) => {
  const cleanCmd = options.yarn ? 'yarn cache clean' : 'npm cache verify';
  const installCmd = options.yarn ? 'yarn install' : 'npm install';
  let success = false;
  let nomSpinner = false;

  if (!options.verbose) {
    nomSpinner = new Spinner(`${chalk.bold.magenta('nom nom nom')} %s`);
    nomSpinner.start();
  } else {
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

    if (options.reinstall) {
      if (options.verbose)
        console.log(chalk.cyan('Reinstalling:'), chalk.bold.white(installCmd));
      await exec(installCmd);
    }

    success = true;
  } catch (error) {
    console.error(error);
  }

  if (nomSpinner) nomSpinner.stop(true);

  if (success)
    console.log(chalk.bold.white.bgGreen(' NOMMED! '));
  else
    console.log(chalk.white.bgRed.bold(` Nomming error! Run "${installCmd}" `));
}

// update options from arguments
process.argv.slice(2).forEach(arg => {
  if (arg === '--verbose')
    options.verbose = true;
  else if (arg === 'yom' || arg === '--yarn' || arg === '-Y')
    options.yarn = true;
  else if (arg === '--clean' || arg === '-C')
    options.clean = true;
  else if (arg === '--no-reinstall' || arg === '-nr')
    options.reinstall = false;
});

go(options);
