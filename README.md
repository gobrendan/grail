# Pattern Lab

### Prerequisites

- [Node](https://nodejs.org) for core processing
- [npm](https://www.npmjs.com/) to manage project dependencies
- [grunt.js](http://gruntjs.com/) to run tasks and interface with the core library. 
- [Browsersync](https://browsersync.io/) to view the Pattern Lab interface

Node version 4 or higher suffices. You can follow the directions for [installing Node](https://nodejs.org/en/download/) on the Node website if you haven't done so already. Installation of Node will include npm.

It's also highly recommended that you [install grunt](http://gruntjs.com/getting-started) globally.

Running `npm install` from a directory containing a `package.json` file will download all dependencies defined within.

## Getting started

- Run `npm install`
- Run `grunt`
- Open a new Terminal, run `cd public`
- Run `browser-sync start --server`

At this point, the project should be open in the default browser. The second Terminal was opened so Browsersync can run there. You can return to the initial Terminal. It's time to build patterns!

### Local server 

While Pattern Lab comes with [Browsersync](https://browsersync.io) included, it's recommended to use Browsersync on its own (Browsersync can be installed globally). 

### Updating Pattern Lab

To update Pattern Lab please refer to each component's GitHub repository, and the [master instructions for core](https://github.com/pattern-lab/patternlab-node/wiki/Upgrading). The components are listed at the top of the README.

### Commands (in progress)

These are commands you can use in Terminal for working with Pattern Lab. The full list is included in the Gruntfile. 

- `grunt` — generates Pattern Lab interface, all components, templates and pages, compiles Sass to CSS, copies all necessary static assets to `public` directory, and creates prod-ready-assets ZIP file
- `grunt pl` — generates components and pages, and Pattern Lab interface
- `grunt css` — runs CSS-related tasks (Sass and minification). 
- `grunt copy` — copies all necessary static assets to `public` directory

### Pattern Lab-specific commands

To list all available commands type:

    grunt patternlab:help

## Demo site and continuous integration

(coming soon)

### Static assets

The latest static assets can be found at `prod-ready-assets` directory. This includes all files referenced in the Pattern Lab interface -- images, stylesheets (.css and .map files), JavaScript files (libraries, plugins, scripts), fonts, JSON, XML and text files.
