var app = angular.module('StarterApp', ['ngMaterial', 'ngRoute'], '');

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'views/start.html'
      }).
      when('/email/:emailId', {
        templateUrl: 'views/emailDetails.html',
        controller: 'EmailDetailsCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      });
  }]);

app.controller('AppCtrl', ['$scope', '$mdSidenav', function($scope, $mdSidenav){
	$scope.toggleSidenav = function(menuId) {
		$mdSidenav(menuId).toggle();
	};
}])

.controller('InboxListCtrl', function($scope, $filter, emailData){
	$scope.emails = emailData;
})

.controller('EmailDetailsCtrl', function($scope, $routeParams, $location, emailData){
    $scope.email_id = $routeParams.emailId;
    emailData = emailData.filter(function(email) {
    	return email._id === $scope.email_id;
    });
    if (emailData.length !== 1) {
    	 $location.path('/start');
    }

    $scope.emailData = emailData[0];
})

.directive("htmlViewer", function() {
    return {
        restrict: "A",
        link: function (scope,element) {
            iframe = element[0];

            scope.$watch('visor', function (newValue) {
                iframe.contentWindow.document.open();
                if (newValue === 'text') {
                    iframe.contentWindow.document.write(scope.emailData.content.text);
                } else {
                    iframe.contentWindow.document.write(scope.emailData.content.html);
                }
                iframe.contentWindow.document.close();
            });

            iframe.onload = function () {
                iframe.style.height = '0px';
                iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
            }
        }
    }
});
