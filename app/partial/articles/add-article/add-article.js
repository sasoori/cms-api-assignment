angular.module('app').controller('AddArticleCtrl',function($scope, $state, articleService){
    $scope.saveArticle = function(article) {
        articleService.saveArticle(article).then(function () {
            $state.go('root.articles',  {}, { reload: true });
        });
    }
});