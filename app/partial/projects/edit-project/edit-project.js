angular.module('app').controller('EditProjectCtrl',function($scope, project, projectService, $state){

    $scope.project= project;


    $scope.saveProject = function(project, editedProject) {

        projectService.saveProject(project, editedProject).then(function () {
            // go back to projects and reload data
            $state.go('root.projects',  {}, { reload: true });
        });
    }
});