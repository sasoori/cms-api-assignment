angular.module('app').controller('EditArticleCtrl', function($scope, article, articleService, $state){
    $scope.article = article;
    $scope.onAction = function() {
        $scope.saveArticle($scope.article, $scope.article);
    };
    $scope.saveArticle = function(article, editedArticle) {
        articleService.saveArticle(article, editedArticle).then(function () {
            // go back to projects and reload data
            $state.go('root.articles',  {}, { reload: true });
        });
    };
});