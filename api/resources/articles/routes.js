const authMiddleware = require('../../middlewares/auth');
const mongoose = require('mongoose');
const multer = require('multer');
const mime = require('mime');
const crypto = require ("crypto");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(4, function(err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
        });
    }
});
const upload  = multer({ storage: storage });

module.exports = function(server) {

    // UPLOAD IMAGES
    server.post('/article/upload', authMiddleware, upload.single('file'), function(req,res) {
        console.log(req.file);
        res.send(req.file);
    });
    // GET ARTICLES
    server.get('/articles', function(req, res) {
        var Article = mongoose.model('Article');
        Article.find(function(err, docs) {
            res.send(docs);
        });
    });
    // GET ARTICLE
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
    server.delete('/articles', authMiddleware, function(req, res) {
        var idList = JSON.parse(req.query.list);
        var Article = mongoose.model('Article');
        Article.remove({'_id': { $in: idList}}, function(err, docs){
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(idList);
            }
        });
    });
};
