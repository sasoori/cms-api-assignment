angular.module('app').directive('articleForm', function(articleService, $timeout, Upload) {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            editedArticle: '='
        },
        templateUrl: 'partial/articles/cms-article-form/article-form.html',
        link: function (scope, $state, element, attrs, fn) {
            var eventListeners = [];
            scope.article = {};
            // Article fields
            var editableFields = [
                { field: 'title', defaultValue: null },
                { field: 'category', defaultValue: null },
                { field: 'author', defaultValue: null },
                { field: 'coverImage', defaultValue: null },
                { field: 'content', defaultValue: null }
            ];
            scope.categories = [
                'Tech',
                'Events',
                'Reviews',
                'Insights'
            ];
            scope.addArticle = function() {
                if (scope.article.content && scope.article.coverImage) {
                    scope.save();
                }
            };
            scope.save = function() {
                articleService.saveArticle(scope.article, scope.editedArticle).then(function() {
                    scope.$emit('articleSaveSuccessful');
                });
            };
            _.each(editableFields, function(field) {
                scope.article[field.field] = field.defaultValue;
            });
            if (scope.editedArticle) {
                scope.editedArticle = _.cloneDeep(scope.editedArticle);
                _.each(editableFields, function(field) {
                    if (scope.editedArticle[field.field] !== undefined) {
                        scope.article[field.field] = scope.editedArticle[field.field];
                    }
                });
            }

            scope.isUploading = false;
            scope.uploadFiles = function (file) {
                scope.isUploading = true;
                Upload.upload({
                    url: 'http://localhost:3010/article/upload',
                    data: {
                        file: file
                    }
                }).then(function (resp) {
                    scope.article.coverImage = resp.data.filename;
                    scope.isUploading = false;
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                })
            };

            eventListeners.push(scope.$on('saveArticle', function() {
                $timeout(function() { // to prevent $apply already in progress
                    $('button[type="submit"]').trigger('click');
                }, 0);
            }));

            scope.$on('$destroy', function() {
                _.forEach(eventListeners, function(listener) {
                    listener.call();
                });
                eventListeners = [];
            });
        }
    };
});
