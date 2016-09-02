angular.module('app').factory('articleService',function($http, $q, IP) {

    var articleService = {
        model: {
            articleList: {}
        },
        getArticles: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: IP + '/articles',
                ignoreLoadingBar: false
            }).then(function(res) {
                articleService.model.articleList = res.data;
                deferred.resolve(res.data);
            }, function (error) {
                deferred.reject(error)
            });
            return deferred.promise;
        },
        saveArticle: function(newArticle, editedArticle) {
            var deferred= $q.defer();
            var articleId = '';
            var article = newArticle;
            if (editedArticle) {
                article = _.extend(editedArticle, newArticle);
                articleId = '/' + editedArticle._id;
            }
            $http({
                method: editedArticle ? 'PUT' : 'POST',
                url: IP + '/article' + articleId,
                data: article,
                ignoreLoadingBar: false
            }).then(function (res) {
                deferred.resolve(res);
            }, function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        getArticle: function(articleID) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: IP + '/article/' + articleID,
                ignoreLoadingBar: false
            }).then(function(res) {
                deferred.resolve(res.data);
            }, function (error) {
                deferred.reject(error)
            });
            return deferred.promise;
        },
        deleteArticles: function(selectedArticles) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: IP + '/articles/delete',
                params: {
                    list: JSON.stringify(selectedArticles)
                },
                ignoreLoadingBar: false
            }).then(function(res) {
                articleService.model.articleList = res.data;
                deferred.resolve(res.data);
            }, function (error) {
                deferred.reject(error)
            });
            return deferred.promise;
        }
    };

    return articleService;
});