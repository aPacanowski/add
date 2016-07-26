var app = angular.module('MyApp', []);



app.controller('AppCtrl',function($scope, $http) {
var refresh = function(){
	$http.get('/workerlog').success(function(response){
		console.log("Data recived");
		$scope.workerlog = response;
		$scope.worker = "";
	});
};
refresh();

$scope.addWorker = function(){
	console.log($scope.worker);
	$http.post(
		'/workerlog',
		$scope.worker,
		$scope.worker.Time_on = moment().format('HH:mm:ss'),
		$scope.worker.Time_off = moment().add(8,'hours').format('HH:mm:ss'),
		$scope.worker.Date = moment().format('DD.MM.YYYY')
	).success(function(response) {
		console.log(response);
		refresh();
	});
};
$scope.remove = function(id) {
	console.log(id);
	$http.delete('/workerlog/' + id).success(function(response){
		refresh();
	});
};
  $scope.$on('$locationChangeStart', function( event ) {    
    if (!$scope.form.$dirty) return;
    var answer = confirm('If you leave this page you are going to lose all unsaved changes, are you sure you want to leave?')
    if (!answer) {
      event.preventDefault();
    }
  });
 });

