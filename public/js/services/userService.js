angular.module('rethread').service('userService', function($http, $q, $rootScope) {

	var user;

	this.addUser = function(newUser) {
		return $http({
			method: 'POST',
			url: '/api/users',
			data: newUser
		});
	};

	this.login = function(credentials) {
		var deferred = $q.defer();
		console.log("userService", credentials);
		$http({
			method: 'POST',
			url: '/api/auth/local',
			data: credentials
		}).then(function(res) {
			console.log('Result from user login', res);
			deferred.resolve(res.data);
		});
		return deferred.promise;
	}

	this.logout = function() {
		return $http({
			method: 'GET',
			url: '/api/auth/logout'
		}).then(function() {
			//return $state.go('');
			console.log('User logged out');
		});
	}

	this.getAuthedUser = function() {
		var deferred = $q.defer();
		console.log('getAuthedUser');
		if (user) {
			deferred.resolve(user);
		}
		else {
			$http({
				method: 'GET',
				url: '/api/users/currentUser'
			}).then(function(result) {
				user = result.data;
				console.log('Result getting the logged in user', result);
				deferred.resolve(result.data);
			});
		}
		return deferred.promise;
	}


});