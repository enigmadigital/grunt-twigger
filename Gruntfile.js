/*
 * grunt-twigger
 * https://github.com/noisysocks/grunt-twigger
 *
 * Copyright (c) 2014 Robert Anderson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    twigger: {

      template_src: {
        expand: true,
        cwd: 'test/fixtures/template_src',
        src: '*.twig',
        dest: 'tmp/template_src/',
        ext: '.html'
      },

      template_src_with_data: {
        src: 'test/fixtures/template_src_with_data/template.twig',
        data: {
          foo: 'Foo',
          bar: 2
        },
        dest: 'tmp/template_src_with_data/output.html'
      },

      data_src: {
        expand: true,
        cwd: 'test/fixtures/data_src',
        src: '*.json',
        template: 'test/fixtures/data_src/template.twig',
        dest: 'tmp/data_src/',
        ext: '.html'
      },

      data_src_with_data: {
        src: 'test/fixtures/data_src_with_data/data.json',
        template: 'test/fixtures/data_src_with_data/template.twig',
        data: {
          foo: 'Foo',
          bar: 2
        },
        dest: 'tmp/data_src_with_data/output.html'
      },

      concatenated_data: {
        src: 'test/fixtures/concatenated_data/template.twig',
        data: [
          'test/fixtures/concatenated_data/data*.{yaml,json}',
          { foo: 'Three', bar3: 3 }
        ],
        dest: 'tmp/concatenated_data/output.html'
      }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'twigger', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
