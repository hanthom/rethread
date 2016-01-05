angular.module('rethread').controller('shirtsCtrl', function($scope, shirtService){

	$scope.getShirts = function() {
		shirtService.getShirts().then(function(shirts) {
			$scope.shirts = shirts;
		})
	};

	$scope.getShirts();

	// $scope.getSpecificShirt = function(idObj) {
	// 	shirtService.getSpecificShirt().then(function(shirts) {
			
	// 	})
	// }

});