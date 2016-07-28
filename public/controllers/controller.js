var app = angular.module('MyApp', []);

app.controller('AppCtrl', function ($scope, $http, $window) {
	var refresh = function(){
	$http.get('/workerlog').success(function(response){
		console.log("Data recived");
		$scope.workerlog = response;
		});
	};
	
	$scope.worker = {};

	$scope.remove = function (id) {
		console.log(id);
		$http.delete('/workerlog/' + id).success(function (response) {
			refresh();
		});
	};

	$scope.onExit = function () {
	console.log($scope.worker.Name);
		$http.get('/workerlog/', {
			params: {Name: $scope.worker.Name
			}
		}).success(function(data, status) {
			x = [].concat(data);
			$scope.worker = x[0];
			console.log($scope.worker._id);
			$http.put('/workerlog/' + $scope.worker._id);
			refresh();
		});
	};
	
	$scope.onVisit = function () { 
			$http.post('/workerlog', $scope.worker).success(function (response) {
				console.log(response);
				refresh();
			});
	};

$window.onunload =  $scope.onExit();
});
