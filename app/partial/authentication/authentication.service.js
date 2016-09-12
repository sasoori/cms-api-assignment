angular.module('app').factory('authService',function($http, $rootScope, $q, Session, $localForage, IP) {

    var authService = {

        login: function(credentials) {
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: IP + '/account/login',
                data: credentials,
                ignoreLoadingBar: false
            }).then(function(response) {
                $rootScope.isLoggedIn = true;
                deferred.resolve(authService.setToken(response.data));
            }, function(error) {
                 deferred.reject(error);
            });
            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: IP + '/account/logout',
                ignoreLoadingBar: false
            }).then(function(response) {
                $rootScope.isLoggedIn = false;
                Session.model.user = {};
                $localForage.clear();
                deferred.resolve(response);
            }, function(error) {
                deferred.reject(error);
            });
            return deferred.promise;
        },
        isLoggedIn: function() {
            return authService.getToken().then(function() {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: IP + '/account/checkLogin',
                    data: Session.model.user,
                    ignoreLoadingBar: false
                }).then(function (response) {
                    $rootScope.isLoggedIn = true;
                    deferred.resolve(response.data);
                }, function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            });
        },
        setToken: function(userData) {
            return $localForage.setItem('user', userData).then(function(userData) {
                Session.model.user = userData;
                return userData;
            });
        },
        getToken: function() {
            return $localForage.getItem('user').then(function(userData){
                if (userData) {
                    Session.model.user = userData;
                    return userData;
                } else {
                    return null;
                }
            });
        },
    };

    return authService;
});
