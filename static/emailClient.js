var app = angular.module('StarterApp', ['ngMaterial']);

app.controller('AppCtrl', ['$scope', '$mdSidenav','emailData', function($scope, $mdSidenav, emailData){
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};

	console.log(emailData);
}]);