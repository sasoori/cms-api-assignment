angular.module('app').controller('AddProjectCtrl',function($scope, projectService, $state){
    var eventListeners = [];
    eventListeners.push($scope.$on('projectSaveSuccessful', function() {
        $state.go('root.projects',  {}, { reload: true });
    }));

    $scope.$on('$destroy', function() {
        _.forEach(eventListeners, function(listener) {
            listener.call();
        });
        eventListeners = [];
    });
});