const path = require('path');


module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      build: {
        src: 'src/js/technos-tapume.js',
        dest: 'build/js/technos-tapume.min.js'
      }
    },
    express: {
      server: {
        options: {
          port: 9000,
          bases: 'build',
          livereload: true
        }
      }
    },
    browserSync: {
        bsFiles: {
          src : [
              'build/css/*.css',
              'build/*.html'
              ]
        },
        options: {
            server: {
                baseDir: "./build"
            }
        }
    },
    sass: {
      sass: {
        dist: {
          files: {
            'build/css/technos-tapume.css': 'src/scss/technos-tapume.scss'
          }
        }
      }
    },
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['sr/js/**/*.js'],
        tasks: ['uglify']
      },
      compass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['compass']
      },
      files: [
      path.resolve(__dirname, 'build') + '/{,*/}*.*'
    ]
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.registerTask('default', ['uglify', 'sass', 'compass', 'express','browserSync'])
}
