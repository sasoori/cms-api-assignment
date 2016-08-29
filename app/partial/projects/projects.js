angular.module('app').controller('ProjectsCtrl',function($scope, projectsService, $state, $filter){

    $scope.projects = projectsService.model.projectsList;
    $scope.onAddProject = function () {
        $state.go('root.projects.add-project')
    };
    $scope.onAction = function(project, action) {
        if (action === 'edit') {
            $state.go('root.projects.edit-project', {id: project._id, slug: $filter('slugify')(project.name)});
        } else {
            $state.go('root.projects.single-project', {id: project._id, slug: $filter('slugify')(project.name)});
        }

    }
});