angular.module('app').controller('LogoutCtrl',function($scope, $state){
    $state.go('login');
});