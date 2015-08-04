angular.module('main')
	.controller('StoryController', StoryController)

StoryController.$inject = ['$scope','$http'];
function StoryController($scope, $http){
	this.storyText = '';
	this.submit = function(){
		this.storyText += ' ' + this.userInput;
		this.userInput = '';
	}
}