module.exports = function(grunt) {

    require('jit-grunt')(grunt);
    grunt.initConfig({
        path: {
            less: 'static/less',
            js: 'static/js',
            lib: 'static/jib',
        },
        connect: {
            main: {
                options: {
                    port: 9003,
                    open: true,
                    livereload: 35727
                }
            }
        },
        less: {
            development: {
                options: {
                    sourceMap: true,
                    sourceMapRootpath: '/'
                },
                files: {
                    ".temp/main_less.css" : ["<%= path.less %>/main.less"]
                }
            }
        },
        copy: {
            main: {
                files: [
                    { // Semantic UI
                        src: [
                            'static/libs/semantic/dist/themes/default/assets/fonts/icons.woff'
                        ],
                        dest: 'dist/themes/default/assets/fonts/',
                        filter: 'isFile',
                        flatten: true,
                        expand: true
                    }
                ]
            }
        },
        concat: {
            css: {
                src: ['static/css/*.css', '.temp/main_less.css'],
                dest: 'dist/main.min.css',
            },
            js: {
                src: ['static/js/*.js'],
                dest: 'dist/main.min.js',
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/main.min.js': ['<%path.lib/js/main.js']
                }
            }
        },
        cssmin: {
            vendor: {
                src: ['<%= dom_munger.data.vendorcss %>'],
                dest: 'dist/vendor.min.css'
            }
        },
        clean: {
            temp: ['.temp'],
            dist: ['dist']
        },
        watch: {
            styles: {
                files: ['<%= path.less %>/{,*/}*.less'],
                tasks: ['less','concat:css'],
                options: {
                    livereload: 35727
                }
            },
            ejs: {
                files: ['views/{,*/}*.ejs'],
                options: {
                    livereload: 35727
                }
            },
            js: {
                files: ['<%= path.js %>/{,*/}*.js'],
                tasks: ['concat:js'],
                options: {
                    livereload: 35727
                }
            }
        }
    });

    grunt.registerTask('serve', [
        'clean',
        'less',
        'concat',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'less',
        'concat',
        //'uglify',
        //'cssmin',
        'copy',
        'clean:temp'
    ]);


};
