angular.module('app').controller('ArticlesCtrl',function($scope, articleService, $state, $filter, SweetAlert){
    $scope.articles = articleService.model.articleList;
    $scope.selectAll = false;
    $scope.onSelectAll = function() {
        _.each($scope.articles, function (key) {
            _.assign(key , {'selected': $scope.selectAll});
        });
    };
    $scope.onOpenArticle = function(article) {
        $state.go('root.articles.article', {id: article._id, slug: $filter('slugify')(article.title)});
    };
    $scope.onAction = function(action) {
        switch(action) {
            case 'add':
                $state.go('root.articles.add-article');
                break;
            case 'remove':
                onRemoveClick();
                break;
            default:
                break;
        }
    };
    function onRemoveClick() {
        var selectedItems = _.map(_.filter($scope.articles, 'selected'), '_id');
        if (_.isEmpty(selectedItems)) { return; }
        SweetAlert.swal({
            title: "Are you sure?",
            text: "Your will not be able to restore selected articles",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: true
        }, function(confirm){
            if (confirm) {
                articleService.deleteArticles(selectedItems);
                $state.reload();
            }
        });
    };
});