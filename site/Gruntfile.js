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
                    "dist/main.min.css" : ["<%= path.less %>/main.less"]
                }
            }
        },
        concat: {
            jsDevelopment: {
                src: ['<%= path.lib %>/*.js','<%= path.js %>/*.js'],
                dest: 'dist/main.min.js',
            }
        },
        uglify: {
            js: {
                files: {
                    'dist/main.min.js': ['temp/js/main.js']
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    '<%= path.dist %>/main.min.css': ['.temp/main.css']
                }
            }
        },
        clean: {
            temp: ['.temp'],
            dist: ['dist']
        },
        watch: {
            styles: {
                files: ['<%= path.less %>/{,*/}*.less'],
                tasks: ['less'],
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
                tasks: ['concat:jsDevelopment'],
                options: {
                    livereload: 35727
                }
            }
        }
    });

    grunt.registerTask('serve', [
        'clean',
        'less',
        'concat:jsDevelopment',
        'watch'
    ]);

    grunt.registerTask('build', [
        'clean',
        'less',
        'concat:css',
        'concat:js',
        'uglify',
        'cssmin',
        'clean:temp'
    ]);


};
