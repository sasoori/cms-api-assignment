const mongoose  = require('mongoose');
var authMiddleware = require('../../middlewares/auth');

module.exports = function(server) {
    // GET ARTICLES
    server.get('/api/articles', function(req, res) {
        var Article = mongoose.model('Article');
        Article.find(function(err, docs) {
            res.send(docs);
        });

    });
    // EDIT ARTICLE
    server.put('/api/article/:id', function(req, res) {
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
    server.post('/api/article', function(req, res) {
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
    // DELETE ARTICLE
    server.delete('/api/article/:id', function(req, res) {
        var id = req.params.id;
        var Article = mongoose.model('Article');
        Article.findByIdAndRemove(id, function(err, doc) {
            if (!err) {
                res.send(doc);
            } else {
                res.sendStatus(400);
            }
        });

    });

};
