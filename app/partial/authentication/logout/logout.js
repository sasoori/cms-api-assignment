angular.module('app').controller('LogoutCtrl',function($scope,$window, $rootScope){
    $state.go('login');
});