module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    marked: {
      dist: {
        files: [
        {
          expand: true,     // Enable dynamic expansion.
          cwd: 'content',      // Src matches are relative to this path.
          src: ['**/*.md'], // Actual pattern(s) to match.
          dest: 'dist/',   // Destination path prefix.
          ext: '.html',   // Dest filepaths will have this extension.
          extDot: 'first'   // Extensions in filenames begin after the first dot
        },
        ]
      }
    }
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*',
          onCreateServer: function(server, connect, options) {
           var io = require('socket.io').listen(server);
           io.sockets.on('connection', function(socket) {
              // do something with socket
            });
         }
       }
     }
   }
 });

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-marked');
grunt.loadNpmTasks('grunt-contrib-connect')

// Default task(s).
grunt.registerTask('default', ['marked']);

};