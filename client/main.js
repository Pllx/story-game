(function() {
	angular.module('main',[
		'ui.router'
	])

	.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$stateProvider
			.state('home',{
				url: '/',
				templateUrl: 'partials/home.html'
			})
			.state('story',{
				url: '/story',
				templateUrl: 'partials/story.html',
				controller: 'StoryController',
				controllerAs: 'storyControl'
			});
			$urlRouterProvider.otherwise('/');
	});
})();