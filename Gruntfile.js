module.exports = function(grunt) {

	// Load the plugin that provides the required tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: ['dist']
		},
		uglify: {
			options: {
					sourceMap: '../',
					mangle: false
				},
			js: {
				files: {
					'dist/lib.min.js': ['lib/angular.min.js', 'lib/jquery-2.1.4.min.js', 'lib/angular-ui-router.js', 'lib/bootstrap.min.js', 'lib/angular-datepicker.js', 'lib/angular-uuid2.min.js', 'lib/underscore.min.js'],
					'dist/less.min.js' :['lib/less.min.js'],
					'dist/tween.js' : ['lib/Tween.js'],
					'dist/three.min.js' :['lib/three.min.js','lib/threex.domevents.js', 'js/homeVRCore.js'],
					'dist/app.min.js': ['js/glvrweb-module.js','js/schema-service.js','js/home-controller.js','js/landing-controller.js','js/firstfloor-controller.js','js/login-controller.js','js/confirmClick.js','js/serverError.js']
				}
			}
		},
		less: {
			style: {
				files: {
					"dist/layout.less": "css/layout.css"
				},
			}
		},
		cssmin: {
			options: {
				advanced: false //avoid CSS property merging issues
			},
			lib: {
				src: 'css/angular-datepicker.css',
				dest: 'dist/angular-datepicker.min.css'
			}
		},
		copy: {
			lib: {
				files: [{
					src: "css/bootstrap.css",
					dest: "dist/bootstrap.css"
				},
				{
					src: "css/font-awesome.min.css",
					dest: "dist/font-awesome.min.css"
				}]
			 }
		}
  });

 //Register default tasks
 grunt.registerTask('default', ['clean','uglify','less','cssmin','copy']);
};