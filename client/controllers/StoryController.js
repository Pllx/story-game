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
		//console.log(lat + ',' + lng);
		this.codeLatLng(lat, lng);
	}

	this.codeLatLng=function(lat,lng){
		var latlng = new google.maps.LatLng(lat,lng);
		geocoder.geocode({'latLng':latlng}, function(results, status){
			if(status === google.maps.GeocoderStatus.OK){
				this.postLocation = results[1].formatted_address;
				this.storyRecord.postLocation = this.postLocation;
				this.gotLocation = true;
				$http.post('/storyrecords',this.storyRecord);
				$scope.$digest();
			}
		}.bind(this));
	}

	this.submitToDatabase = function(){
		//get geolocation
		this.storyRecord.username = this.username;
		this.storyRecord.storySnippet = this.userInput;
		if(window.navigator && window.navigator.geolocation){
			var geolocation = window.navigator.geolocation;
			console.log(this);
			geolocation.getCurrentPosition(successFunction.bind(this));
		}
		else{
			console.log("Geolocation is not supported");
		}
		console.log(this.storyRecord);
		// $http.post('/storyrecords',this.storyRecord);
	}

	this.submit = function(){
		this.gotLocation = false;
		this.storyText += ' ' + this.userInput;
		this.submitToDatabase();
		this.userInput = '';


	}
}