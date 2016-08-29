angular.module('app').directive('projectCard', function() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            projectInfo: '=',
            preview: '=',
            action: '&'
        },
        templateUrl: 'partial/projects/cms-project-card/project-card.html',
        link: function(scope, element, attrs, fn, $filter ) {
            // Workaround because UI router does not support $state injection in the directive and ui-sref does not support dynamic values
            scope.onAction = function(action) {
                scope.action.call(this, {project: scope.projectInfo, action: action});
            };
            scope.frameworkDisplay = function(value, notPrefix) {
                if (scope.projectInfo.framework) {
                    if (notPrefix) {
                        if (value.indexOf('JS') > -1) {
                            var first = value.substr(0, value.length - 2);
                            return first;
                        } else {
                            return value;
                        }
                    } else {
                        if (value.indexOf('JS') > -1) {
                            var last = value.substr(value.length - 2);
                            return last;
                        } else {
                            return;
                        }
                    }
                }
            };
        }
    };
});
