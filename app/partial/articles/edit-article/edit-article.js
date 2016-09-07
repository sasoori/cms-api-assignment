angular.module('app').controller('EditArticleCtrl', function($scope, article, articleService, $state) {

    var eventListeners = [];
    $scope.article = article;
    $scope.onAction = function() {
       $scope.$broadcast('saveArticle');
    };
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