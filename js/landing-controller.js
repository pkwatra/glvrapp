angular.module('glvrApp').controller('landingController', ['$rootScope', '$scope', '$location', 'SchemaService', function ($rootScope, $scope, $location, SchemaService) {

	SchemaService.getUserName(function (res) {
		if (res) {
			$rootScope.isUserLoggedIn = true;			
		}
		else 
		{
			$location.path('/home');
		}

		ChangeMeshToStep1();
		BindDragEvents();		
		StopRotation(true);
	})

	$rootScope.showMenu = function() {
		 $(".main-menu-link").hide();
	     $('.main-nav').animate({"right": '0'});
	}


	$scope.hideMenu = function() {
		$('.main-nav').animate({"right": '-400px'}, function() {
			$(".main-menu-link").show();
		});
	}

	function HideMenuControl() {
		$('.main-nav').animate({"right": '-400px'}, function() {
			$(".main-menu-link").show();
		});	
	}

	$scope.goToStep2 = function() {
		HideMenuControl();
		ChangeMeshToStep2();
		BindDragEvents();
		StopRotation(true);	
		CreateMesh(true);		
	}

	$scope.goToStep1 = function() {
	    HideMenuControl();	
		RemoveAllMesh();	
		ChangeMeshToStep1();
		BindDragEvents();		
		StopRotation(true);		
	}
}]);



