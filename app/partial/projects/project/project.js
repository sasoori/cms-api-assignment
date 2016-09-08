angular.module('app').controller('SingleProjectCtrl',function($scope, $filter, project, $state, SweetAlert, projectService) {
    $scope.project = project;
    $scope.onAction = function(action) {
        switch(action) {
            case 'add':
                $state.go('root.projects.edit-project', {id: project._id, slug: $filter('slugify')(project.name)});
                break;
            case 'remove':
                onRemoveClick();
                break;
            default:
                break;
        }
    };
    function onRemoveClick() {
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to restore this project",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function(confirm){
            if (confirm) {
                projectService.deleteProjects([$scope.project._id]);
                $state.go('root.projects', {}, { reload: true });
            }
        });
    }
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