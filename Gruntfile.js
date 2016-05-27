var webpackConfigs = {
  dev: require('./tools/webpack.dev.config'),
  prd: require('./tools/webpack.prd.config')
};

module.exports = grunt => {
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('gruntify-eslint');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    webpack: {
      dev: webpackConfigs.dev,
      prd: webpackConfigs.prd
    },
    htmlmin: {
      prd: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'public/index.html': 'src/index.html'
        }
      },
      dev: {
        files: {
          'public/index.html': 'src/index.html'
        }
      }
    },
    postcss: {
      options: {
        processors: [
          //require('pixrem')(), // add fallbacks for rem units
          //require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          //require('cssnano')() // minify the result
          //require('')
        ]
      },
      dev: {
        src: 'public/assets/css/main.css',
        dest: 'public/assets/css/main.css'
      }
    },
    sass: {
      prd: {
        options: {
          style: 'compressed',
          loadPath: [
            'node_modules/bootstrap/scss',
            'node_modules/font-awesome/scss'
          ],
          require: [
            'sass-css-importer'
          ]
        },
        files: {
          'public/assets/css/main.css': 'src/assets/css/main.scss'
        }
      },
      dev: {
        options: {
          style: 'expanded',
          loadPath: [
            'node_modules/bootstrap/scss',
            'node_modules/font-awesome/scss'
          ],
          require: [
            'sass-css-importer'
          ]
        },
        files: {
          'public/assets/css/main.css': 'src/assets/css/main.scss'
        }
      }
    },
    imagemin: {
      prd: {
        files: [{
          expand: true,
          cwd: './src',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: './public'
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: './src',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: './public'
        }]
      }
    },
    watch: {
      css: {
        options: {
          atBegin: true,
          livereload: true
        },
        files: ['src/assets/css/**/*.scss'],
        tasks: ['sass:dev']
      },
      images: {
        options: {
          atBegin: true,
          livereload: true
        },
        files: ['src/assets/img/**/*'],
        tasks: ['imagemin:dev']
      },
      html: {
        options: {
          atBegin: true,
          livereload: true
        },
        files: ['src/**/*.html'],
        tasks: ['htmlmin:dev']
      },
      fonts: {
        options: {
          atBegin: true,
          livereload: true
        },
        files: ['src/assets/fonts/**/*'],
        tasks: ['copy:fonts']
      },
      js: {
        options: {
          atBegin: true
        },
        files: ['src/assets/js/**/*.js'],
        tasks: ['jshint']
      }
    },
    copy: {
      fontawesome: {
        expand: true,
        cwd: './node_modules/font-awesome/fonts/',
        src: '*',
        dest: 'public/assets/fonts/fontawesome',
        filter: 'isFile'
      },
      fonts: {
        expand: true,
        cwd: 'src/assets/fonts/',
        src: '**/*',
        dest: 'public/assets/fonts/',
        filter: 'isFile'
      },
      loose: {
        expand: true,
        cwd: 'src',
        src: 'favicon.ico',
        dest: 'public',
        filter: 'isFile'
      }
    },

    karma: {
      unit: {
        configFile: './tools/karma.unit.conf.js',
        autoWatch: false,
        singleRun: true,
      },
      unitWatch: {
        configFile: './tools/karma.unit.conf.js',
        autoWatch: true,
        singleRun: false,
      }
    },

    webdriver: {
      test: {
        configFile: 'tools/wdio.conf.js'
      }
    },

    eslint: {
      src: ['src/assets/js/**/*.js']
    },
  });
  // Default task(s).
  //grunt.registerTask('default', []);
  grunt.registerTask('build-dev', ['webpack:dev', 'htmlmin:dev', 'sass:dev', 'imagemin:dev', 'copy']);
  grunt.registerTask('build-prd', ['webpack:prd', 'htmlmin:prd', 'sass:prd', 'imagemin:prd', 'copy']);
};