angular.module('app').controller('AddArticleCtrl',function($scope, $state){
    var eventListeners = [];
    eventListeners.push($scope.$on('articleSaveSuccessful', function() {
        $state.go('root.articles',  {}, { reload: true });
    }));

    $scope.$on('$destroy', function() {
        _.forEach(eventListeners, function(listener) {
            listener.call();
        });
        eventListeners = [];
    });
});