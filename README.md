# nomyom

![nomnomnom](https://media.giphy.com/media/xpCotDEpVkXYY/giphy.gif)

A small tool to reset your `./node_modules`.

* `npm` and `yarn` support
* cross-platform thanks to [rimraf](https://github.com/isaacs/rimraf)
* option to verify/clean cache

_Inspired by @pzuraq's [nombom](https://github.com/pzuraq/nombom) and @johnotander's [turn-it-off-and-on-again](https://github.com/johnotander/turn-it-off-and-on-again)_

## Install

```bash
npm install -g nomyom
# OR
yarn global add nomyom
```

## Usage

```bash
# inside a project directory
nomyom
```

### Options

`help` for all available arguments.

`--clean` or `-C` to clean the npm/yarn cache.

`--skip-install` to skip reinstalling.

`--verbose` to print additional output.

## Todo

[x] auto-detect yarn vs npm
[ ] verbose should show all stdout/error
[x] add `help` command
[ ] improve spinner on Windows
