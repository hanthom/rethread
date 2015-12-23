angular.module('rethread', ['ui.router']).config(function($urlRouterProvider, $stateProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/templates/home.html',
			controller: 'homeCtrl'
		})
		.state('register', {
			url:'/register',
			templateUrl: '/templates/register.html',
			controller: 'registerCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: '/templates/login.html',
			controller: 'loginCtrl'
		})
		.state('logout', {
			url: '/logout',
			controller: function(userService, $state) {
				userService.logout();
				$state.go('home');
			}
		})
		.state('auth', {
			abstract: true,
			template: '<ui-view></ui-view>',
			resolve: {
				user: function(userService) {
					return userService.getAuthedUser();
				}
			}
		})
		.state('auth.profile', {
			url: '/profile',
			template: '../templates/profile.html',
			controller: 'profileCtrl'
		});

	$httpProvider.interceptors.push(function($q, $injector, $location) {
		return {
			responseError: function(rejection) {
				console.log('Kelevra', rejection);
				if (rejection.status === 401) {
					document.location = "/#/login";
				}
				return $q.reject(rejection);
			}
		};
	});
});


