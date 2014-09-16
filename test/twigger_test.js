'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.twigger = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  template_src: function(test) {
    test.expect(2);

    var actual, expected;

    actual = grunt.file.read('tmp/template_src/template1.html');
    expected = grunt.file.read('test/expected/template_src/template1.html');
    test.equal(actual, expected);

    actual = grunt.file.read('tmp/template_src/template2.html');
    expected = grunt.file.read('test/expected/template_src/template2.html');
    test.equal(actual, expected);

    test.done();
  },

  data_src: function(test) {
    test.expect(2);

    var actual, expected;

    actual = grunt.file.read('tmp/data_src/data1.html');
    expected = grunt.file.read('test/expected/data_src/data1.html');
    test.equal(actual, expected);

    actual = grunt.file.read('tmp/data_src/data2.html');
    expected = grunt.file.read('test/expected/data_src/data2.html');
    test.equal(actual, expected);

    test.done();
  },

  data_src_with_data: function(test) {
    test.expect(1);

    var actual, expected;

    actual = grunt.file.read('tmp/data_src_with_data/output.html');
    expected = grunt.file.read('test/expected/data_src_with_data/output.html');
    test.equal(actual, expected);

    test.done();
  },

  concatenated_data: function(test) {
    test.expect(1);

    var actual, expected;

    actual = grunt.file.read('tmp/concatenated_data/output.html');
    expected = grunt.file.read('test/expected/concatenated_data/output.html');
    test.equal(actual, expected);

    test.done();
  },
};
