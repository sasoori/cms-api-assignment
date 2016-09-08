angular.module('app').controller('ArticleCtrl', function($scope, $state, $filter, $sce, article, articleService, SweetAlert){
    $scope.article = article;
    $scope.content = $sce.trustAsHtml($scope.article.content);
    $scope.onAction = function(action) {
        switch(action) {
            case 'add':
                $state.go('root.articles.edit-article', {id: article._id, slug: $filter('slugify')(article.title)});
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
    }
    $scope.onEditArticle = function() {

    };
});