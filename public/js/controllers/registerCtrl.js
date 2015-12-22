angular.module('rethread').controller('registerCtrl', function($scope, userService) {

	$scope.register = function() {
		userService.addUser({
			email: $scope.email,
			password: $scope.password
		}).then(function(result) {
			console.log('User registered');
		});
	}

});
