# nomyom

![nomnomnom](https://media.giphy.com/media/xpCotDEpVkXYY/giphy.gif)

A small tool to reset your `./node_modules`.

* `npm` and `yarn` support
* cross-platform thanks to [rimraf](https://github.com/isaacs/rimraf)
* option to verify/clean cache

_Inspired by @pzuraq's [nombom](https://github.com/pzuraq/nombom) and @johnotander's [turn-it-off-and-on-again](https://github.com/johnotander/turn-it-off-and-on-again)_

## Install

```
npm install -g nomyom
```

## Usage

```bash
# inside a project directory
nomyom
```

### Options

`--yarn` or `-Y` for a Yarn project.

`--clean` or `-C` to clean the npm/yarn cache.

`--no-reinstall` or `-nr` to skip reinstalling.

`--verbose` to print output.

### Full Example

```bash
# for a Yarn project: clean cache, skip reinstall, and verbose output
nomyom -Y -C -nr --verbose
```

## Todo

* auto-detect yarn vs npm
* verbose should show all stdout/error
* add `help` command
* improve spinner on Windows
