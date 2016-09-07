angular.module('app').directive('articleForm', function(articleService, $timeout) {
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
                { field: 'content', defaultValue: null }
            ];
            scope.categories = [
                'Tech',
                'Events',
                'Reviews',
                'Insights'
            ];
            scope.addArticle = function() {
                scope.save();
            };
            scope.save = function() {
                articleService.saveArticle(scope.article, scope.editedArticle).then(function() {
                    scope.$emit('articleSaveSuccessful')
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
