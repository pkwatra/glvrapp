angular.module('glvrApp').controller('homeController', ['$rootScope', '$scope', '$location', 'SchemaService', function ($rootScope, $scope, $location, SchemaService) {
	$scope.submitted = false;
	$scope.inValidUser = false;
	$scope.adminError = false;
	$rootScope.isUserLoggedIn = false;
	
	SchemaService.showHomeImage(function (re){
		console.log("Showing Home page!");
	})	

	$scope.showLoginScreen = function() {
		$('.login-panel').animate({"right": '0'});
	} 

	$scope.hideLoginScreen = function() {
		$('.login-panel').animate({"right": '-400px'});
	} 

	$scope.loginUser = function (form) {
		console.log("Login User");
		$scope.submitted = true;
		if (!form.$valid) {
			return false;
		}

		var user = {};
		user.username = $scope.username;
		user.password = $scope.password;
		SchemaService.authenticateUser(user, function (data) {
			console.log(data);
			if (data == false) {
				$scope.inValidUser = true;
			}
			else if (data == true) {
				console.log("Landing Page");
				$location.path('/landing');
			}
			else {
				$scope.adminError = true;
				return false;
			}
		})
	}

}]);


