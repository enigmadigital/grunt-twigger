/*
 * grunt-twigger
 * https://github.com/izilla/grunt-twigger
 *
 * Copyright (c) 2014 XO Digital
 * Licensed under the MIT license.
 */

'use strict';

var Twig = require('twig'),
    _    = require('lodash');

module.exports = function(grunt) {

  function isDataFile(path) {
    if (!_.isString(path))
      return false;

    if (path.match(/\.json$/i))
      return true;

    if (path.match(/\.yaml$/i))
      return true;

    return false;
  }

  function parseDataFile(path) {
    if (!grunt.file.exists(path)) {
      grunt.log.warn('Data file "' + path + '" not found.');
      return {};
    }

    if (path.match(/\.json$/i))
      return grunt.file.readJSON(path);

    if (path.match(/\.yaml$/i))
      return grunt.file.readYAML(path);

    grunt.log.warn('Could not parse data file "' + path + '".');
    return {};
  }

  function parseDataPattern(pattern) {
    if (!pattern)
      return {};

    if (_.isPlainObject(pattern))
      return pattern;

    var glob = _.isString(pattern) || _.isArray(pattern) && pattern.every(_.isString);
    if (glob) {
      var paths = grunt.file.expand(pattern);
      var sources = paths.map(parseDataFile);
      return _.merge.apply(null, sources);
    }

    if (_.isArray(pattern)) {
      var sources = pattern.map(parseDataPattern);
      return _.merge.apply(null, sources);
    }

    grunt.log.warn('Could not parse part of data pattern "' + pattern + '".');
    return {};
  }

  grunt.registerMultiTask('twigger', 'Easy way to turn data and/or twig templates into HTML.', function() {

    var options = this.options({
      twig: {
        cache: false
      },
      data: {}
    });

    Twig.cache(options.twig.cache);

    var globalData = parseDataPattern(options.data);

    this.files.forEach(function(f) {
      f.src.forEach(function(filepath) {

        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return;
        }

        var data = _.cloneDeep(globalData);
        _.merge(data, parseDataPattern(f.data));

        var template;

        if (isDataFile(filepath)) {
          if (!f.template) {
            grunt.log.warn('No template given for data file "' + filepath + '".');
            return;
          }

          _.merge(data, parseDataFile(filepath));
          template = f.template;
        } else {
          template = filepath;
        }

        if (!grunt.file.exists(template)) {
          grunt.log.warn('Template file "' + template + '" not found.');
          return;
        }

        var output;

        try {
          options.twig.path = template;
          options.twig.async = false;
          options.twig.rethrow = true;

          options.preRender && options.preRender({
            data: data,
            src: filepath,
            template: template
          });

          var compiled = Twig.twig(options.twig);
          output = compiled.render(data);
        } catch (ex) {
          grunt.log.warn('Error compiling twig template: "' + ex + '".');
        }

        if (output) {
          grunt.file.write(f.dest, output);
          grunt.log.writeln('File "' + f.dest + '" created.');
        }

      });
    });

  });

};
