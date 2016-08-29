angular.module('app').controller('AddProjectCtrl',function($scope, projectsService, $state){

    $scope.saveProject = function(project) {
        projectsService.saveProject(project).then(function () {
            // go back to projects and reload data
            $state.go('root.projects',  {}, { reload: true });
        });
    }
});