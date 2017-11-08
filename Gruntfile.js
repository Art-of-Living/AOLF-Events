module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
		dist: {
		  files: [
			{
			  'public/css/main.css': [
				'public/templates/**/*.less'
			  ]
			}
		  ]
		},
		options: {
		  compress: true
		}
	},
	uglify: {
		my_target: {
		  options: {
			beautify: true
		  },
		  files: {
			'public/js/minify.min.js': ['public/templates/**/*.js']
		  }
		}
	}
  });

  grunt.registerTask('default', ['less','uglify']);
};