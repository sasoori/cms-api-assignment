angular.module('app').directive('articleForm', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            saveArticle: '&',
            editedArticle: '='
        },
        templateUrl: 'partial/articles/cms-article-form/article-form.html',
        link: function (scope, $state, element, attrs, fn) {
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
            scope.addArticle = function () {
                scope.save();
            };
            scope.save = function () {
                if (_.isFunction(scope.saveArticle)) {
                    scope.saveArticle.call(this, {article: scope.article, editedArticle: scope.editedArticle});
                }
            };
            _.each(editableFields, function (field) {
                scope.article[field.field] = field.defaultValue;
            });
            if (scope.editedArticle) {
                //scope.editedArticle = _.cloneDeep(scope.editedArticle);
                _.each(editableFields, function (field) {
                    if (scope.editedArticle[field.field] !== undefined) {
                        scope.article[field.field] = scope.editedArticle[field.field];
                    }
                });
            }

        }
    };
});
