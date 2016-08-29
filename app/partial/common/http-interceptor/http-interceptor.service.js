angular.module('app').factory('HttpInterceptor',function($q, $location, Session, $injector) {

    return {

        request: function (request) {
            request.headers['authorization'] = Session.model.user.token;
            return request;
        },

        response: function (response) {

            return response;
        },

        responseError: function (rejection) {

            if (rejection.status === 403 && rejection.data === 'Invalid session') {
                $injector.get('$state').go('logout');
            }
            if (rejection.status === 401) {
                $injector.get('$state').go('logout');
            }
            return $q.reject(rejection);
        }
    };


});