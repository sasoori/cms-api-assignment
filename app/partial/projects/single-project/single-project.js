angular.module('app').controller('SingleProjectCtrl',function($scope, project){
    $scope.project = project;

    $scope.frameworkDisplay = function(value, notPrefix) {
        if ($scope.project.framework) {
            if (notPrefix) {
                if (value.indexOf('JS') > -1) {
                    var first = value.substr(0, value.length - 2);
                    return first;
                } else {
                    return value;
                }
            } else {
                if (value.indexOf('JS') > -1) {
                    var last = value.substr(value.length - 2);
                    return last;
                } else {
                    return;
                }
            }
        }
    };
});