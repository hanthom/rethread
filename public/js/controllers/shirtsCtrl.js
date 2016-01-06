angular.module('rethread').controller('shirtsCtrl', function($scope, shirtService){

	$scope.getShirts = function() {
		shirtService.getShirts().then(function(results) {
			console.log("Get Shirts:", results);
			$scope.shirts = results;
		})
	};

	$scope.getShirts();

	// $scope.targetShirt = {};

	// $scope.getTargetShirt = function(shirt) {
	// 	$scope.targetShirt = shirt;
	// } 

});