/**
 * Created by benli on 21/10/14.
 */
module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['Gruntfile.js', 'js/**/*.js', '!js/vendor/**/*']
        },
        watch: {
            options: {
                livereload: true
            },
            jshint: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint']
            }
        },
        connect: {
            options: {
                livreload: true,
                open: true
            },
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9001
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint', 'connect', 'watch']);

};