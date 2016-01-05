angular.module('rethread').controller('shirtsCtrl', function($scope, shirtService){

	$scope.getShirts = function() {
		shirtService.getShirts().then(function(shirts) {
			$scope.shirts = shirts;
		})
	};

	$scope.getShirts();

	$scope.targetShirt = {};

	$scope.getTargetShirt = function(shirt) {
		$scope.targetShirt = shirt;
	} 

	// $scope.getSpecificShirt = function(idObj) {
	// 	shirtService.getSpecificShirt().then(function(shirts) {
			
	// 	})
	// }

});