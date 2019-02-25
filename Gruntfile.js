module.exports = function (grunt) {

    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass,
                sourceMap: false
            },
            dist: {
                files: {
                    'build/css/styles.css': 'src/scss/styles.scss'
                }
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps

                processors: [
                    require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'build/css/*.css'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            main: {
                files: {
                    'build/js/main.min.js': ['node_modules/jquery/dist/jquery.js', 'src/js/main.js']
                }
            }
        },
        watch: {
            css: {
                files: ['src/scss/*/**'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false,
                },
            },
            js: {
                files: ['src/js/*.js', 'src/js/vendor/**'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'postcss', 'uglify', 'watch']);

};
