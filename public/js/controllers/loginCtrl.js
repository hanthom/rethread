angular.module('rethread').controller('loginCtrl', function($scope, userService, $state){
  $scope.login = function(){
  	console.log("loginCtrl");
    userService.login({
    	email: $scope.email,
    	password: $scope.password
    }).then(function(){
    	console.log("It worked");
      $scope.credentials = {};
      $state.go('auth.profile');
    });
  }
});