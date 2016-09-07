const mongoose = require('mongoose');

exports.connect = function() {
    return new Promise(function(resolve, reject) {
        mongoose.connect('mongodb://localhost/cms-assignment');
        mongoose.connection.on('error', function(err) {
            console.log('Mongo error: ', err);
            reject(err);
        });
        mongoose.connection.once('open', function() {
            resolve();
        });
    });
};