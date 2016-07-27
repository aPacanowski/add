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
		$scope.worker.Time_off = moment().format('HH:mm:ss');
		$http.put('/workerlog/' + $scope.worker._id, $scope.worker.Timr_off);
		}

	$scope.onVisit = function () {
		$http.get('http://ipv4.myexternalip.com/json').then(function (result) {
			$scope.worker.Name = result.data.ip;
			$scope.worker.Time_on = moment().format('HH:mm:ss');
			//$scope.worker.Time_off = moment().add(8, 'hours').format('HH:mm:ss');
			$scope.worker.Date = moment().format('DD.MM.YYYY');


			$http.post('/workerlog', $scope.worker).success(function (response) {
				console.log(response);
			});
		}, function (e) {
			console.log(e);
		});
		refresh();
	};
$window.onbeforeunload =  $scope.onExit;
});

