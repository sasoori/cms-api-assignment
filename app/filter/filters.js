/*global moment */
angular.module('app').filter('dateMomentUtc', function() {
    return function(input) {
        return moment.utc(input).format("Do MMM YYYY");
    };
});
angular.module('app').filter('slugify', function() {
    return function(input) {
        return input
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-')
            ;
    };
});
