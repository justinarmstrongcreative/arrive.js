module.exports = function(grunt) {
    var baseDir = '';
    var source = baseDir + 'source/';
    var assets = baseDir + 'demo/';

    var javascript = {
        //libraries: [source + 'js/libraries/lodash/lodash.custom.min.js'],
        //helpers: source + 'js/helpers.js',
        theme: [
            //Libraries
            source + '*.js',
        ],
        all: [],
    };

    Array.prototype.push.apply(javascript.all);
    //javascript.all.push(javascript.helpers);
    Array.prototype.push.apply(javascript.all, javascript.theme);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // This is where we configure JSHint
        jshint: {
            all: {
                src: javascript.theme,
                options: {
                    bitwise: false,
                    camelcase: false,
                    curly: true,
                    eqeqeq: true,
                    forin: true,
                    immed: true,
                    indent: 4,
                    latedef: false,
                    newcap: false,
                    noarg: true,
                    noempty: true,
                    nonew: true,
                    regexp: true,
                    undef: false,
                    unused: false,
                    trailing: true,
                    reporterOutput: '',
                },
            },
        },

        concat: {
            options: {
                process: function(src, filepath) {
                    return '\n\n// file: ' + filepath + '\n\n' + src + ';';
                },
            },
            dist: {
                src: javascript.all,
                dest: assets + 'scripts.js',
            },
        },

        uglify: {
            options: {
                mangle: false,
                preserveComments: 'some',
            },
            my_target: {
                files: (function() {
                    var files = {};
                    files[assets + 'scripts.min.js'] = [assets + 'scripts.js'];
                    return files;
                })(),
            },
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                    sourceMap: true,
                    sourceMapFilename: assets + 'styles.min.css.map',
                    sourceMapURL: 'styles.min.css.map',
                },
                files: (function() {
                    var files = {};
                    files[assets + 'styles.min.css'] =
                        source + 'onScreen.less';
                    return files;
                })(),
            },
        },

        watch: {
            styles: {
                files: [source + '*.less'], // which files to watch
                tasks: ['less'],
                options: {
                    nospawn: true,
                },
            },
            js: {
                files: [source + '*.js'],
                tasks: ['jshint', 'concat', 'uglify'],
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch']);
};