angular.module('app').controller('EditArticleCtrl', function($scope, article, articleService, $state, SweetAlert) {

    var eventListeners = [];
    $scope.article = article;
    $scope.onAction = function(action) {
        switch(action) {
            case 'add':
                $scope.$broadcast('saveArticle');
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
            text: "Your will not be able to restore this article",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function(confirm){
            if (confirm) {
                articleService.deleteArticles([$scope.article._id]);
                $state.go('root.articles', {}, { reload: true });
            }
        });
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