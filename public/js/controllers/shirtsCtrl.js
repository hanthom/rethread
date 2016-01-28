angular.module('rethread').controller('shirtsCtrl', function($scope, shirtService, $state){

	$scope.getShirts = function() {
		shirtService.getShirts().then(function(results) {
			console.log("Get Shirts:", results);
			$scope.shirts = results;
		})
	};

	$scope.getShirts();

	$scope.goShirtPage = function(shirtID) {
		$state.go("auth.shirtPage", {id : shirtID})
	}

	// $scope.targetShirt = {};

	// $scope.getTargetShirt = function(shirt) {
	// 	$scope.targetShirt = shirt;
	// } 

});