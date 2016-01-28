angular.module('rethread').controller('singleShirtCtrl', function($scope, shirtService, $state, resolveShirt) {

	$scope.shirt = resolveShirt.data;



});