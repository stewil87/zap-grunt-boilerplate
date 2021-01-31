module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: false,
                createTag: false,
                tagName: 'version',
                tagMessage: '%VERSION%',
                push: false,
                metadata: '',
                regExp: false
            }
        },
        cachebreaker: {
            dev: {
                options: {
                    match: [
                        {
                            'js/main.min.js' : 'build/js/main.min.js',
                            'css/style.css' : 'build/css/style.css'
                        }
                    ],
                    replacement: 'md5'
                },
                files: {
                    src: ['build/index.php']
                }
            }
        },
        'dart-sass': {
            target: {
                options: {
                    outputStyle: 'compressed'
                },
                files: {
                    'build/css/style.css': 'src/scss/style.scss'
                }
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/js/main.js'],
                dest: 'build/js/main.js',
            },
        },
        uglify: {
            options: {
                mangle: false
            },
            main: {
                files: {
                    'build/js/main.min.js': ['build/js/main.js']
                }
            }
        },
        watch: {
            css: {
                files: ['src/scss/**','src/scss/*/**'],
                tasks: ['dart-sass', 'cachebreaker', 'bump:patch'],
                options: {
                    spawn: false,
                },
            },
            js: {
                files: ['src/js/**', 'src/js/vendor/**'],
                tasks: ['concat', 'uglify', 'cachebreaker', 'bump:patch'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-dart-sass');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('versionup', ['bump:major']);
    grunt.registerTask('default', ['dart-sass', 'concat', 'uglify', 'cachebreaker', 'bump:minor', 'watch']);
};
