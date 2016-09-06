angular.module('app').controller('ArticleCtrl', function($scope, $state, $filter, $sce, article){
    $scope.article = article;
    $scope.content = $sce.trustAsHtml($scope.article.content);
    $scope.onEditArticle = function() {
        $state.go('root.articles.edit-article', {id: article._id, slug: $filter('slugify')(article.title)});
    };
});