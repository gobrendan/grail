# Pattern Lab

## Getting started

- Run `npm install` or `sudo npm install`







### Prerequisites

The Pattern Lab Node - Grunt Edition uses [Node](https://nodejs.org) for core processing, [npm](https://www.npmjs.com/) to manage project dependencies, and [grunt.js](http://gruntjs.com/) to run tasks and interface with the core library. Node version 4 or higher suffices. You can follow the directions for [installing Node](https://nodejs.org/en/download/) on the Node website if you haven't done so already. Installation of Node will include npm.

It's also highly recommended that you [install grunt](http://gruntjs.com/getting-started) globally.

Running `npm install` from a directory containing a `package.json` file will download all dependencies defined within.

To install Pattern Lab and all dependencies:

* download or `git clone` this repository to an install location.

* run the following

    ```
    cd install/location
    npm install
    ```

### Local server 

While Pattern Lab comes with [Browsersync](https://browsersync.io) included, it's recommended to use Browsersync on its own (Browsersync can be installed globally). 

With Browsersync installed, use a command-line interface (CLI) to navigate to the `public` directory, then run the following command:

````
browser-sync start --server
````

### Pattern Lab Node - Grunt Edition

The Grunt wrapper around [Pattern Lab Node Core](https://github.com/pattern-lab/patternlab-node), providing tasks to interact with the core library and move supporting frontend assets.

### Packaged Components

The Grunt Edition comes with the following components:

* `patternlab-node`: [GitHub](https://github.com/pattern-lab/patternlab-node), [npm](https://www.npmjs.com/package/patternlab-node)
* `patternengine-node-mustache`: [GitHub](https://github.com/pattern-lab/patternengine-node-mustache), [npm](https://www.npmjs.com/package/patternengine-node-mustache)
* `pattern-lab/styleguidekit-assets-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-assets-default)
* `pattern-lab/styleguidekit-mustache-default`: [GitHub](https://github.com/pattern-lab/styleguidekit-mustache-default)

### Updating Pattern Lab

To update Pattern Lab please refer to each component's GitHub repository, and the [master instructions for core](https://github.com/pattern-lab/patternlab-node/wiki/Upgrading). The components are listed at the top of the README.

### Commands

These are some helpful commands you can use on the command line for working with Pattern Lab. There are more commands located in the Grunt file.

### Pattern Lab-specific commands

To list all available commands type:

    grunt patternlab:help

### Grunt commands

#### Run all processes

Run the Pattern Lab build process, compile the Sass to CSS, copy all static files to the `public` directory and generate a .zip of all the static assets:

````
grunt
````

#### Build Pattern Lab

Run just the Pattern Lab build process (build Pattern Lab interface and convert all Mustache files to static HTML):

````
grunt pl
````

### Compile CSS

Compile the Sass to CSS, generate a minified version, copy static CSS files to the `public` directory, and generate a .zip file of all the static assets:

````
grunt css
````

### Compile Sass to CSS and copy all static assets

Generate a .zip of all static assets (compile Sass to CSS and copy all static assets to the `public` and `prod-ready-assets` directories), type:

````
grunt assets
````

### Simply copy static assets

Copy all static assets to the `public` directory:

````
grunt c
````

### Run Pattern Lab and CSS tasks

Run `pl` then the `css` tasks:

````
grunt pl_css
````

## Source control

The project is being hosted in a Gitlab server, which is on-prem at Cardinal's Cincinnati office.

## Demo site and continuous integration

Cardinal uses an automation server called Jenkins, which handles the demo site's continuous integration processes. Jenkins pings the Gitlab repo every 5 minutes to check for updates to the `master` branch. When updates are made, a CI process kicks off. Jenkins grabs the contents of the repo, builds the Pattern Lab site on the server and and FTPs the contents of the `public` directory to a cloud-hosted Azure server.

The following is the demo site URL and credentials:

[patternlab-ncdot.azurewebsites.net](http://patternlab-ncdot.azurewebsites.net)  
Username: ncdot  
Password: ncd0tp@tt3rn1@b

### Getting the latest static assets

The latest static assets can be found at `prod-ready-assets` directory. This includes all files referenced in the Pattern Lab interface -- images, favicons, stylesheets (.css and .map files), JavaScript files (libraries, plugins, scripts), fonts, JSON, XML and text files.



Components needed:
- card, card set
- modal, modal with carousel 
- Google Maps
- tabs
- tables
- hero
- form demos
- Isotope
- before/after 
- sticky nav, sticky side nav
- 