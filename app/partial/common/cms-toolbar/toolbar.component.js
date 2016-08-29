angular.module('app').directive('toolbar', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            title: '@',
            btnText: '@',
            btnIcon: '@',
            btnAction: '&'
        },
        templateUrl: 'partial/common/cms-toolbar/toolbar.html',
        link: function(scope, element, attrs, fn, $state) {



        }
    };
});
