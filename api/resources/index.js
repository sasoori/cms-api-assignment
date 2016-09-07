const _ = require('lodash');
const models = require('require-all')({
    dirname     :  __dirname,
    filter      :  /(model)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});
const routers = require('require-all')({
    dirname     :  __dirname,
    filter      :  /(routes)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : true
});
module.exports = function(server) {
    _.each(routers, function(resource) {
        _.each(resource, function(router) {
            router(server);
        });
    });

};