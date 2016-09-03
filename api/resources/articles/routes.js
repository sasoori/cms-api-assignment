const mongoose  = require('mongoose');
var authMiddleware = require('../../middlewares/auth');
const _ = require('lodash');

module.exports = function(server) {
    // GET ARTICLES
    server.get('/articles', function(req, res) {
        var Article = mongoose.model('Article');
        Article.find(function(err, docs) {
            res.send(docs);
        });

    });
    //GET ARTICLE
    server.get('/article/:id', function(req, res) {
        const Article = mongoose.model('Article');
        Article.findByIdAndUpdate(req.params.id, {$inc: { views: 1 }}, function(err, doc) {
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }  else {
                res.send(doc);
            }
        });
    });
    // EDIT ARTICLE
    server.put('/article/:id', authMiddleware, function(req, res) {
        var id = req.params.id;
        var Article = mongoose.model('Article');
        Article.findByIdAndUpdate(id, req.body, function(err, doc) {
            if (!err) {
                res.send(doc);
            } else {
                res.sendStatus(400);
            }
        });
    });
    // CREATE ARTICLE
    server.post('/article', authMiddleware, function(req, res) {
        var Article = mongoose.model('Article');
        var data = req.body;
        var newArticle = new Article(data);
        newArticle.save(function(err) {
            if (!err) {
                res.send(data);
            } else {
                console.log(err);
                res.sendStatus(400);
            }
        });
    });
    // DELETE ARTICLES
    server.post('/articles/delete', authMiddleware, function(req, res) {
        var isError = false;
        var articleList = JSON.parse(req.query.list);
        var Article = mongoose.model('Article');
        _.each(articleList, function (id) {
            Article.findByIdAndRemove(id, function(err, doc) {
                if (err) {
                    isError = true;
                }
            });
        });
        if (!isError) {
            res.send(articleList);
        } else {
            res.sendStatus(400);
        }
    });
};
