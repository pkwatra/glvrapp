angular.module('glvrApp').directive('confirmClick', [
  function () {
  	return {
  		priority: -1,
  		restrict: 'A',
  		link: function (scope, element, attrs) {
  			element.bind('click', function (e) {
  				if (attrs.enableConfirm == "true") {
  					var message = attrs.confirmClick;
  					if (message && !confirm(message)) {
  						e.stopImmediatePropagation();
  						e.preventDefault();
  					}
  				}
  			});
  		}
  	}
  }
]);
