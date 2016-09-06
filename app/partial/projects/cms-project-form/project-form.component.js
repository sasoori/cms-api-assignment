angular.module('app').directive('projectForm', function() {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            saveProject: '&',
            editedProject: '='
        },
        templateUrl: 'partial/projects/cms-project-form/project-form.html',
        link: function(scope, $state, element, attrs, fn) {
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

            scope.searchLanguages = function ($query) {
                return _.filter(scope.programmingLanguages, function(element) {
                    return element.toLowerCase().indexOf($query.toLowerCase()) !== -1;
                });
            };
            scope.addProject = function () {
                scope.project.background = scope.project.background.cssClass;
                scope.project.languages = _.map(scope.project.languages,'text');
                scope.save();
            };
            scope.save = function () {
               if (_.isFunction(scope.saveProject)) {
                   scope.saveProject.call(this, { project: scope.project, editedProject: scope.editedProject });
               }
            };
            _.each(editableFields, function (field) {
                scope.project[field.field] = field.defaultValue;
            });

            if (scope.editedProject) {
                //scope.editedProject = angular.copy(scope.editedProject);
                _.each(editableFields, function(field) {
                    if (scope.editedProject[field.field] !== undefined) {
                        scope.project[field.field] = scope.editedProject[field.field];
                    }
                });
                scope.project.background = _.find(scope.backgroundColors, ['cssClass', scope.project.background]);
            }

        }
    };
});
