/*
 * grunt-requirejs-injector
 * https://github.com/cuarti/grunt-requirejs-injector
 *
 * Copyright (c) 2015 Albert Cuartiella
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        requirejs_injector: {
            print: {
                src: 'test/fixtures/print/main.js',
                dest: 'tmp/print.js'
            },
            assert: {
                src: 'test/fixtures/assert/main.js',
                dest: 'tmp/assert.js'
            },
            foo: {
                src: 'test/fixtures/foo/main.js',
                dest: 'tmp/foo.js'
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
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'requirejs_injector', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

    grunt.registerTask('development', ['requirejs_injector:foo']);

};
