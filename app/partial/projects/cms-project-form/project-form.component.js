angular.module('app').directive('projectForm', function(projectService, $timeout) {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            editedProject: '='
        },
        templateUrl: 'partial/projects/cms-project-form/project-form.html',
        link: function(scope, element, attrs, fn) {
            var eventListeners = [];
            scope.project = {};
            scope.backgroundColors = [
                {
                    name: 'No background',
                    cssClass: 'no-bg',
                },
                {
                    name: 'Reddish',
                    cssClass: 'bg-red',
                },
                {
                    name: 'Violet',
                    cssClass: 'bg-violet'
                },
                {
                    name: 'Orange',
                    cssClass: 'bg-orange'
                }
            ];
            // Project fields
            var editableFields = [
                { field: 'name', defaultValue : null },
                { field: 'framework', defaultValue : null },
                { field: 'languages', defaultValue : [] },
                { field: 'status', defaultValue : null },
                { field: 'description', defaultValue: null },
                { field: 'background', defaultValue : scope.backgroundColors[0] },
            ];

            scope.statusTypes = [
                {
                    name: 'Active',
                    type: 'ACTIVE',
                },
                {
                    name: 'Inactive',
                    type: 'INACTIVE'
                },
                {
                    name: 'Dead',
                    type: 'DEAD'
                }];

            scope.frameworks = [
                'AngularJS',
                'ReactJS',
                'NodeJS',
                'Meteor'
            ];

            scope.programmingLanguages = [
                'C#',
                'PHP',
                'VB.NET',
                'Java',
                'JavaScript'
            ];

            scope.searchLanguages = function($query) {
                return _.filter(scope.programmingLanguages, function(element) {
                    return element.toLowerCase().indexOf($query.toLowerCase()) !== -1;
                });
            };
            scope.addProject = function() {
                scope.project.languages = _.map(scope.project.languages,'text');
                scope.save();
            };
            scope.save = function() {
                projectService.saveProject(_.cloneDeep(scope.project), scope.editedProject).then(function() {
                    scope.$emit('projectSaveSuccessful');
                }, function(error) {
                    scope.$emit('saveFailed', {message: error});
                });
            };
            _.each(editableFields, function(field) {
                scope.project[field.field] = field.defaultValue;
            });

            if (scope.editedProject) {
                scope.editedProject = _.cloneDeep(scope.editedProject);
                _.each(editableFields, function(field) {
                    if (scope.editedProject[field.field] !== undefined) {
                        scope.project[field.field] = scope.editedProject[field.field];
                    }
                });
                scope.project.background = _.find(scope.backgroundColors, ['cssClass', scope.project.background]);
            }
            eventListeners.push(scope.$on('saveProject', function() {
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
