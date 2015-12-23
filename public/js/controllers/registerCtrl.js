angular.module('rethread').controller('registerCtrl', function($scope, userService, $state) {

	$scope.register = function() {
		userService.addUser({
			email: $scope.email,
			password: $scope.password
		}).then(function(result) {
			console.log('User registered');
			$state.go('login');
		});
	}

});
