var app = angular.module('StarterApp', ['ngMaterial'], '');

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};
}])

.controller('InboxListCtrl', function($scope, $filter, emailData){
	$scope.emails = emailData;
	$scope.showRead = true;
	$scope.$watch('showRead', function() {
		var groupedData = {};
		for (var i = 0; i < emailData.length; i++) {
			if ($scope.showRead || emailData[i].read) {
				var dateIndex = $filter('date')(emailData[i].dateReceived * 1000, "yyyy-MM-dd");
				if (!groupedData[dateIndex]) {
					groupedData[dateIndex] = {date: dateIndex, emails: []};
				}
				groupedData[dateIndex]['emails'].push(emailData[i]);
			}
		}
		$scope.groupedData = Object.keys(groupedData).map(function (key) {return groupedData[key]});
	});	
});