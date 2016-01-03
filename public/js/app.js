angular.module('rethread', ['ui.router']).config(function($urlRouterProvider, $stateProvider, $httpProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: '/../templates/home.html',
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
					console.log("User Service Auth call");
					return userService.getAuthedUser()
				}
			}
		})
		.state('auth.profile', {
			url: '/profile',
			templateUrl: '/templates/profile.html',
			controller: 'profileCtrl'
		})
		.state('auth.productsList', {
			url: '/productsList',
			templateUrl: '/templates/productsList.html',
			controller: 'productsListCtrl',
			resolve: {
				consoleLog: function() {
					console.log('Auth ProductsList');
				}
			}
		})
		.state('auth.shirts', {
			url: '/productsList/shirts',
			templateUrl: '/templates/shirts.html',
			controller: 'shirtsCtrl'
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


