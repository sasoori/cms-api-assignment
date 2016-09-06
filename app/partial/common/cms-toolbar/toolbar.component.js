angular.module('app').directive('toolbar', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title: '@',
            btnText: '@',
            btnIcon: '@',
            allowRemove: '=',
            btnAction: '&'
        },
        templateUrl: 'partial/common/cms-toolbar/toolbar.html',
        link: function(scope, element, attrs, fn, $state) {
            scope.onAction = function(action) {
                scope.btnAction.call(this, { action : action});
            };
        }
    };
});
