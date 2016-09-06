angular.module('app').controller('AddProjectCtrl',function($scope, projectService, $state){

    $scope.saveProject = function(project) {
        projectService.saveProject(project).then(function() {
            // go back to projects and reload data
            $state.go('root.projects',  {}, { reload: true });
        });
    };
});