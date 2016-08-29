angular.module('app').factory('Session',function() {

    var Session = {
        model: {
            user: {
                token: null
            },
            users:[]
        }
    };

    return Session;
});