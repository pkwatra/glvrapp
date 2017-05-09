angular.module('glvrApp').directive('serverError', function($parse, $compile){
	return {
		template : '<div class="modal modal-dialog"><div class="modal-header"><h4>Server Error</h4></div><div class="modal-content"><h5>Some error occured. Please contact administrator for details.</h5></div><div class="modal-footer"><button class="modal-close" ng-click="close()">OK</button></div></div>',
		restrict: "A",
		link : function(scope, element, attrs, model){
			scope.close = function(){
				scope.adminError = false;
			}
		}
	}
});