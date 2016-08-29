angular.module('app').controller('LoginCtrl' ,function($rootScope, $scope, $state, authService){

    $scope.credentials = {};
    $rootScope.isLoggedIn = false;
    $scope.submitLogin = function () {
        authService.login($scope.credentials).then(function (data) {
            $state.go('root.projects');
        }, function(response) {

        })
    };
    
});