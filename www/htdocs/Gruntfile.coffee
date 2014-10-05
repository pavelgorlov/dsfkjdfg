module.exports = (grunt) ->

  # Config
  grunt.initConfig
    sass:
      dist:
        options:
          sourcemap: 'none'
          style: 'expanded'
        files:
          'css/all.css': 'sass/all.sass'
    watch:
      app:
        files: '**/*.sass'
        tasks: ['sass']

    autoprefixer:
      options:
        browsers: ['last 2 versions', 'ie 8', 'ie 9'] # $ npm update caniuse-db
        cascade: false
      release:
        src: 'css/all.css',
        dest: 'css/all.prefixed.css'

    cssmin:
      pack:
        files:
          'css/all.min.css': ['css/all.prefixed.css']

  # Tasks
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'

  # Pack CSS
  grunt.registerTask('pack', ['autoprefixer', 'cssmin']);
