angular.module('rethread').controller('loginCtrl', function($scope, userService){
  $scope.login = function(){
    userService.login({
    	email: $scope.email,
    	password: $scope.password
    }).then(function(){
    	console.log("It worked");
      $scope.credentials = {};
    });
  }
});