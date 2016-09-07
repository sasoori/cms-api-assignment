angular.module('app').factory('projectService',function($http, $q, IP) {

    var projectService = {

        model: {
            projectsList : {}
        },
        getProjects: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: IP + '/projects',
                ignoreLoadingBar: false
            }).then(function(res) {
                projectService.model.projectsList = res.data;
                deferred.resolve(res && res.data ? res.data : []);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        getProject: function(id) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: IP + '/project/' + id,
                ignoreLoadingBar: false
            }).then(function(res) {
                deferred.resolve(res && res.data ? res.data : []);
            }, function(error) {
                deferred.reject(error);
            });

            return deferred.promise;
        },
        saveProject: function(newProject, editedProject) {
            var deferred= $q.defer();
            var projectId = '';
            var project = newProject;
            newProject.background = newProject.background.cssClass;

            if (editedProject) {
                project = _.extend(editedProject, newProject);
                projectId = '/' + editedProject._id;
            }
            $http({
                method: editedProject ? 'PUT' : 'POST',
                url: IP + '/project' + projectId,
                data: project,
                ignoreLoadingBar: false
            }).then(function (res) {
                deferred.resolve(res);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        deleteProjects: function(selectedProjects) {
            var deferred = $q.defer();
            $http({
                method: 'DELETE',
                url: IP + '/project',
                params: {
                    list: JSON.stringify(selectedProjects)
                },
                ignoreLoadingBar: false
            }).then(function(res) {
                projectService.model.projectList = res.data;
                deferred.resolve(res.data);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        }
    };

    return projectService;
});