angular.module('glvrApp').controller('loginController', ['$rootScope', '$scope', '$location', 'SchemaService', function ($rootScope, $scope, $location, SchemaService) {
	$rootScope.isUserLoggedIn = false;
	
	$scope.logoutUser = function () {
		SchemaService.logoutUser(function (res) {
			if (!angular.isObject(res)) {
				$rootScope.isUserLoggedIn = false;
				$location.path('/home');
				
			}
		})
	}


}]);


