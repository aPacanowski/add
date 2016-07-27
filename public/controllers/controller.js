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
		$http.get('/workerlog', {
			params: {Name: $scope.worker.Name
			}
		}).success(function(data, status) {
			x = [].concat(data);
			$scope.worker = x[0];
			console.log($scope.worker.Name);
			$scope.worker.Time_off = moment().format('HH:mm:ss');
			$http.put('/workerlog/' + $scope.worker._id, {Time_off: $scope.worker.Time_off});
		});
	};

	$scope.onVisit = function () {
		$http.get('http://ipv4.myexternalip.com/json').then(function (result) {
			$scope.worker.Name = result.data.ip;
			$scope.worker.Time_on = moment().format('HH:mm:ss');
			$scope.worker.Date = moment().format('DD.MM.YYYY');
			$http.post('/workerlog', $scope.worker).success(function (response) {
				console.log(response);
				refresh();
			});
		}, function (e) {
			console.log(e);
		});
	};
	
$window.onunload =  $scope.onExit();
});
