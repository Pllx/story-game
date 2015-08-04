angular.module('main')
	.controller('StoryController', StoryController)

StoryController.$inject = ['$scope','$http'];
function StoryController($scope, $http){
	this.storyRecord = {};
	this.storyText = '';
	this.userInput = '';
	this.postLocation = '';
	this.gotLocation = false;
	var _this = this;
	var geocoder = new google.maps.Geocoder();

	function successFunction(position){
		var lat = position.coords.latitude;
		var lng = position.coords.longitude;
		console.log(lat + ',' + lng);
		codeLatLng(lat, lng);
	}

	function codeLatLng(lat,lng){
		var latlng = new google.maps.LatLng(lat,lng);
		geocoder.geocode({'latLng':latlng}, function(results, status){
			if(status === google.maps.GeocoderStatus.OK){
				this.postLocation = results[1].formatted_address;
				_this.storyRecord.postLocation = this.postLocation;
				_this.gotLocation = true;
				_this.postLocation = this.postLocation;
				console.log(_this.storyRecord.postLocation);
				//_this.gotLocation = true;
/*				this.storyRecord.postLocation = postLocation;
				console.log(this.storyRecord.postLocation);*/
			}
		});
	}

	this.submitToDatabase = function(){
		//get geolocation
		this.storyRecord.storySnippet = this.userInput;
		if(window.navigator && window.navigator.geolocation){
			var geolocation = window.navigator.geolocation;
			geolocation.getCurrentPosition(successFunction);
		}
		else{
			console.log("Geolocation is not supported");
		}
	}

	this.submit = function(){
		this.gotLocation = false;
		this.storyText += ' ' + this.userInput;
		this.submitToDatabase();
		this.userInput = '';

	}
}