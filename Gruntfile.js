/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GRUNT
 * The grunt wrapper around patternlab-node core, providing tasks to interact with the core library and move supporting frontend assets.
******************************************************/

module.exports = function (grunt) {

  var path = require('path'),
      argv = require('minimist')(process.argv.slice(2));

  // load all grunt tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-bell');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-ftp-push');

  //
  // Pattern Lab config
  //

  //read all paths from our namespaced config file
  var config = require('./patternlab-config.json'),
    pl = require('patternlab-node')(config);

  function paths() {
    return config.paths;
  }

  function getConfiguredCleanOption() {
    return config.cleanPublic;
  }

  grunt.registerTask('patternlab', 'create design systems with atomic design', function (arg) {

    if (arguments.length === 0) {
      pl.build(function(){}, getConfiguredCleanOption());
    }

    if (arg && arg === 'version') {
      pl.version();
    }

    if (arg && arg === "patternsonly") {
      pl.patternsonly(function(){},getConfiguredCleanOption());
    }

    if (arg && arg === "help") {
      pl.help();
    }

    if (arg && arg === "liststarterkits") {
      pl.liststarterkits();
    }

    if (arg && arg === "loadstarterkit") {
      pl.loadstarterkit(argv.kit, argv.clean);
    }

    if (arg && (arg !== "version" && arg !== "patternsonly" && arg !== "help" && arg !== "liststarterkits" && arg !== "loadstarterkit")) {
      pl.help();
    }
  });

  grunt.initConfig({

    //
    // Sass
    //

    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          './public/assets/css/style.css': './source/assets/css/style.scss'
        }
      }, 
      sharepoint: {
        options: {
          style: 'expanded'
        },
        files: {
          './public/assets/css/sharepoint-overrides.css': './source/assets/css/sharepoint-overrides.scss'
        }
      }
    },

    //
    // CSS min
    //

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          './public/assets/css/style.min.css': ['./public/assets/css/style.css']
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['ie 9', 'ie 10', 'ie 11']
      },
      your_target: {
        files: {
          './public/assets/css/style.autoprefixed.css': ['./public/assets/css/style.css']
        }
      }
    },

    //
    // Copy
    //

    copy: {
      main: {
        files: [

          { expand: true, cwd: path.resolve(paths().source.root), src: 'favicon.ico', dest: path.resolve(paths().public.root) },
          { expand: true, cwd: path.resolve(paths().source.favicon), src: ['favicon.ico'], dest: path.resolve(paths().public.favicon) },
          { expand: true, cwd: path.resolve(paths().source.js), src: '**/*.js', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.js), src: '**/*.js.map', dest: path.resolve(paths().public.js) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '**/*.css', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().source.css), src: '**/*.css.map', dest: path.resolve(paths().public.css) },
          { expand: true, cwd: path.resolve(paths().source.fonts), src: '**/*', dest: path.resolve(paths().public.fonts) },
          { expand: true, cwd: path.resolve(paths().source.json), src: ['**/*.json'], dest: path.resolve(paths().public.json) },
          { expand: true, cwd: path.resolve(paths().source.xml), src: ['**/*.xml'], dest: path.resolve(paths().public.xml) },
          { expand: true, cwd: path.resolve(paths().source.text), src: ['**/*.txt'], dest: path.resolve(paths().public.text) },
          { expand: true, cwd: path.resolve(paths().source.images),
            src: [
              '**/*.png',
              '**/*.jpg',
              '**/*.gif',
              '**/*.jpeg',
              '**/*.svg'
            ], dest: path.resolve(paths().public.images) },
            
          { expand: true, cwd: path.resolve(paths().source.video),
            src: [
              '**/*.mp4'
            ], dest: path.resolve(paths().public.video) },
  
          { expand: true, cwd: path.resolve(paths().public.assets),
            src: [
              '**/*.*',
              '!images/people/**.*',
              '!js/**/_*.*',
              '!js/pattern-lab-only',
              '!js/pattern-lab-only.*',
              '!js/pattern-lab-only/**.*'
            ], dest: path.resolve(paths().prodReadyAssets) },

          { expand: true, cwd: path.resolve(paths().source.styleguide), src: ['*', '**'], dest: path.resolve(paths().public.root) },

          // slightly inefficient to do this again - I am not a grunt glob master. someone fix
          { expand: true, flatten: true, cwd: path.resolve(paths().source.styleguide, 'styleguide', 'css', 'custom'), src: '*.css)', dest: path.resolve(paths().public.styleguide, 'css') }

        ]
      }
    },

    //
    // Compress
    //

    compress: {
      all_assets: {
        options: {
          archive: 'prod-ready-assets/prod-ready-assets.zip'
        },
        files: [
          {
            src: [
              'public/assets/**',
              '!public/assets/images/people/*',
              '!public/assets/js/**/_*.*',
              '!public/assets/js/pattern-lab-only',
              '!public/assets/js/pattern-lab-only.*',
              '!public/assets/js/pattern-lab-only/*'
            ],
            dest: 'prod-ready-assets/'
          }
        ]
      }
    },

    //
    // Watch
    //

    watch: {
      all: {
        files: [
          path.resolve(paths().source.css + '**/*.css'),
          path.resolve(paths().source.styleguide + 'css/*.css'),
          path.resolve(paths().source.patterns + '**/*'),
          path.resolve(paths().source.fonts + '/*'),
          path.resolve(paths().source.images + '/*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '/*.js'),
          path.resolve(paths().source.root + '/*.ico')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },

    // Local server

    browserSync: {
      dev: {
        options: {
          server:  path.resolve(paths().public.root),
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [
            {
              module: 'bs-html-injector',
              options: {
                files: [path.resolve(paths().public.root + '/index.html'), path.resolve(paths().public.styleguide + '/styleguide.html')]
              }
            }
          ],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        }
      }
    },

    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    }, 

    //
    // FTP Push
    //

    ftp_push: {
      your_target: {
        options: {
          authKey: "serverA",
          host: "ftp.gobrendan.com",
          dest: "/lab/grail/pattern-lab/",
          port: 21, 
          incrementalUpdates: true
        },
        files: [
          {
            expand: true,
            cwd: '.', 
            src: [
              "*"
            ]
          }
        ]
      }
    }

  });

  //
  // Compound tasks
  //

  grunt.registerTask('default', ['patternlab', 'sass', 'cssmin', 'copy', 'compress', 'bell']);
  grunt.registerTask('pl', ['patternlab', 'bell']);
  grunt.registerTask('css', ['sass', 'cssmin', 'copy', 'compress', 'bell']);
  grunt.registerTask('pl_css', ['pl', 'css']);  
  grunt.registerTask('assets', ['sass', 'cssmin', 'copy', 'compress', 'bell']);
  grunt.registerTask('c', ['copy', 'bell']); 
  grunt.registerTask('ftp', ['ftp_push']); 

  grunt.registerTask('postcss', ['postcss:dist']); 

  grunt.registerTask('patternlab:build', ['patternlab', 'copy:main', 'compress']);
  grunt.registerTask('patternlab:watch', ['patternlab', 'copy:main', 'compress', 'watch:all']);
  grunt.registerTask('patternlab:serve', ['patternlab', 'copy:main', 'compress', 'browserSync', 'watch:all']);

};
