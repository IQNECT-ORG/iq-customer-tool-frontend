var webpackConfigs = {
  dev: require('./tools/webpack.dev.config'),
  prd: require('./tools/webpack.prd.config')
};

module.exports = grunt => {
  require('load-grunt-tasks')(grunt);

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
    sass: {
      prd: {
        options: {
          style: 'compressed',
          loadPath: [
            'node_modules/bootstrap/scss',
            'node_modules/font-awesome/scss'
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
        src: '*',
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
        configFile: 'karma.conf.js'
      }
    }
  });
  // Default task(s).
  //grunt.registerTask('default', []);
  grunt.registerTask('build-dev', ['webpack:dev', 'htmlmin:dev', 'sass:dev', 'imagemin:dev', 'copy']);
  grunt.registerTask('build-prd', ['webpack:prd', 'htmlmin:prd', 'sass:prd', 'imagemin:prd', 'copy']);
};