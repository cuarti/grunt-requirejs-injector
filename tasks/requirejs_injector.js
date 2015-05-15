/*
 * grunt-requirejs-injector
 * https://github.com/cuarti/grunt-requirejs-injector
 *
 * Copyright (c) 2015 Albert Cuartiella
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var requirejs = require('requirejs');

    var DEFINE_REGEX = /^\s*define\s*\(\s*[^\]]*]\s*,\s*/;
    var END_REGEX = /}\);\s*$/;
    var COMMA_REGEX = /['"]/g;

    grunt.registerMultiTask('requirejs_injector', 'Inject RequireJS dependencies on definition.', function() {

        var done = this.async();
        var dest = this.data.dest;

        var config = {
            baseUrl: '.',
            name: this.data.src,
            optimize: 'none',
            out: function(compiled) {
                grunt.file.write(dest, compiled);
            },
            onBuildWrite: convert
        };

        var i = config.name.lastIndexOf('/');
        if(i >= 0) {
            config.baseUrl = config.name.substring(0, i);
            config.name = config.name.substring(i + 1);
        }

        var le = config.name.length - 3;
        if(config.name.substring(le) === '.js') {
            config.name = config.name.substring(0, le);
        }

        requirejs.optimize(config, function(response) {
            grunt.verbose.writeln(response);
            grunt.log.ok('File ' + dest + ' created.');
            done();
        }, function(err) {
            done(err);
        });

        //// Merge task-specific and/or target-specific options with these defaults.
        //var options = this.options({
        //    punctuation: '.',
        //    separator: ', '
        //});
        //
        //// Iterate over all specified file groups.
        //this.files.forEach(function(f) {
        //    // Concat specified files.
        //    var src = f.src.filter(function(filepath) {
        //        // Warn on and remove invalid source files (if nonull was set).
        //        if(!grunt.file.exists(filepath)) {
        //            grunt.log.warn('Source file "' + filepath + '" not found.');
        //            return false;
        //        } else {
        //            return true;
        //        }
        //    }).map(function(filepath) {
        //        // Read file source.
        //        return grunt.file.read(filepath);
        //    }).join(grunt.util.normalizelf(options.separator));
        //
        //    // Handle options.
        //    src += options.punctuation;
        //
        //    // Write the destination file.
        //    grunt.file.write(f.dest, src);
        //
        //    // Print a success message.
        //    grunt.log.writeln('File "' + f.dest + '" created.');
        //});

    });

    function convert(name, path, content) {

        var match = DEFINE_REGEX.exec(content);
        if(match) {

            name = name.replace('/', '_');

            var define = match[0];
            var args = define.substring(define.indexOf('[') + 1);
            args = args.substring(0, args.indexOf(']')).replace(COMMA_REGEX, '').replace('/', '_');

            content = 'var ' + name + ' = (' + content.substring(define.length).replace(END_REGEX, '})(' + args + ');');
        }

        return content;
    }

};
