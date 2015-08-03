(function() {
	angular.module('main',[
		'ui.router'
	])

	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider
			.state('home',{
				url: '/',
				templateUrl: 'partials/home.html'
			});
			$urlRouterProvider.otherwise('/');
	});
})();