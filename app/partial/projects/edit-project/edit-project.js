angular.module('app').controller('EditProjectCtrl', function($scope, project, projectService, $state, SweetAlert) {

    var eventListeners = [];
    $scope.project = project;
    $scope.onAction = function(action) {

        switch(action) {
            case 'add':
                $scope.$broadcast('saveProject');
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
            text: "Your will not be able to selected articles",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function(confirm){
            if (confirm) {
                projectService.deleteProjects([$scope.project._id]);
                $state.reload();
            }
        });
    }

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