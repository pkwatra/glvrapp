angular.module('glvrApp', ['ui.router', '720kb.datepicker', 'schemaService'])
.config(['$stateProvider', '$urlRouterProvider', '$compileProvider',
	function config($stateProvider, $urlRouterProvider, $compileProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
		$urlRouterProvider.otherwise('/home');
		$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/views/login.html',
			controller: 'homeController'
		})
		.state('landing', {
			url: '/landing',
			templateUrl: '/views/landing.html', 
			controller: 'landingController' 
		})
		.state('firstfloor', {
			url:'/firstfloor',
		     templateUrl: '/partials/firstfloor.html', 
			 controller: 'firstfloorController' 
		})
	}
])
