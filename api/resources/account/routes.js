var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var guid = require('guid');
var authMiddleware = require('../../middlewares/auth');

module.exports = function(server) {
    // LOGIN
    server.post('/account/login', function(req, res) {
        req.checkBody('password').notEmpty();
        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        var userData = req.body;
        var Account = mongoose.model('Account');
        Account.findOne({ email:userData.email }, function(err, accountDoc) {
            if (accountDoc) {
                bcrypt.compare(userData.password, accountDoc.password, function(err, result) {
                    if (result) {
                        var token = {
                            token:guid.raw()
                        };
                        accountDoc.tokens.push(token);
                        accountDoc.save(function(err){
                            if (!err) {
                                res.send(token);
                            } else {
                                res.sendStatus(401);
                            }
                        });
                    } else {
                        res.sendStatus(401); // invalid password
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    });
    // REGISTER
    server.post('/account', function(req, res) {
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is too short').notEmpty().isLength({min:5});
        var errors = req.validationErrors();
        if (errors) {
            return res.status(400).send(errors);
        }
        var accountData = req.body;
        var email = accountData.email;
        var password = accountData.password;

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                var Account = mongoose.model('Account');
                var account = new Account({
                    email:email,
                    password:hash
                });
                account.save(function(err) {
                    if (err) {
                        console.log(err);
                        res.status(400).send(err);
                    } else {
                        res.send(account);
                    }
                });
            });
        });
    });


    server.post('/account/checkLogin', authMiddleware, function(req, res) {
        res.status(200).send(res.data);
    });
};