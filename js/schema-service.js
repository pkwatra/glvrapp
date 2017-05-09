angular.module('schemaService', [])
.service('SchemaService', function ($http) {
	var params = {
		users: {},	
		primary: {},		
		dateFormat: ''
	};

	if (!window.location.origin) {
		window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
	}

	var hostIp = window.location.origin;

	return {
		showLandingImage : function(callback) {
			//init();
			//animate();
		},
		showHomeImage : function(callback) {
			console.log("Home controller called!!");
		    initHome();
			animateHome();
		},
		getData: function (callback) {
			callback(params)
		},
		cancelData: function (callback) {		
			params.primary = {};			
			callback(params)
		},
		getUserName: function (callback) {
			callback(params.users.username)
		},
		logoutUser: function (callback) {
			params.users = {};
			callback(params.users.username)
		},
		authenticateUser: function (user, callback) {
			var req = {
				method: 'POST',
				url: hostIp + '/login',
				data: JSON.stringify(user)
			};
			$http(req).then(function (resp) { if (resp) { params.users.username = user.username; callback(resp.data); } }, function () { callback(null); });
		},
		getDateFormat: function (callback) {
			var req = {
				method: 'GET',
				url: hostIp + '/date-format',
				data: {}
			};
			$http(req).then(function (resp) { if (resp && resp.data) { params.dateFormat = resp.data; } else { params.dateFormat = 'dd-MM-yyyy'; } callback(params.dateFormat); }, function () { params.dateFormat = 'dd-MM-yyyy';callback(params.dateFormat); });
		}
	};
});