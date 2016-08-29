var mongoose = require('mongoose');

module.exports = function(req, res, next) {
    var token = req.headers.authorization;
    if (token !== undefined) {
        var Account = mongoose.model('Account');
        Account.findOne({'tokens.token':token}, function(err, accDoc) {
            if (!err) {
                if (accDoc) {
                    req.account = accDoc;
                    next();
                } else {
                    res.status(401).send('Not allowed');
                }
            }
        });
    } else {
        res.status(401).send('Not allowed');
    }
};