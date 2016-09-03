const express = require('express');
const request = require('request');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const util = require('./functions');
const _ = require('lodash');
const moment = require('moment');
const API_IP = 'http://localhost:3010';
const IP = 'http://localhost:3030';

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/libs', express.static('libs'));
app.use('/dist', express.static('dist'));
app.use('/static', express.static('static'));

app.listen(3030, ()=> {
    console.log('All is well | PORT: 3030');
});

app.get('/', function(req, res) {
    var pageNum = parseInt(req.query.page);
    if (!(pageNum < 1 || isNaN(pageNum))) {
        pageNum--;
    } else {
        pageNum = 0;
    }
    var postCount = req.query.postCount ? req.query.postCount : 6;
    request(API_IP + '/articles', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            var pageLength = Math.ceil(jsonData.length / postCount);
            var page = jsonData.splice(pageNum * postCount, postCount);
            pageNum++;
            res.render('index', {
                _: _,
                IP: IP,
                pageName: 'Articles',
                pageParent: '',
                moment: moment,
                slugify: util.slugify,
                articles: page,
                numPages: pageLength,
                pageNum: pageNum,
                postCount: postCount
            });
        }
    });
});
app.get('/article/:id/:title?', function(req, res) {
    var articleID = req.params.id;
    request(API_IP +'/article/' + articleID, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var article = JSON.parse(body);
            res.render('article-single', {
                pageName: 'Article - ' + article.title,
                pageParent: 'Articles',
                moment: moment,
                article: article
            });
        }
    });

});
app.get('/portfolio', function(req, res) {
    var pageNum = parseInt(req.query.page);
    if (!(pageNum < 1 || isNaN(pageNum))) {
        pageNum--;
    } else {
        pageNum = 0;
    }
    var postCount = req.query.postCount ? req.query.postCount : 6;
    request(API_IP +'/projects', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var jsonData = JSON.parse(body);
            var pageLength = Math.ceil(jsonData.length / postCount);
            var page = jsonData.splice(pageNum * postCount, postCount);
            pageNum++;
            res.render('portfolio', {
                _: _,
                IP: IP,
                pageName: 'Portfolio',
                pageParent: '',
                moment: moment,
                slugify: util.slugify,
                frameworkDisplay: util.frameworkDisplay,
                projects: page,
                numPages: pageLength,
                pageNum: pageNum,
                postCount: postCount
            });
        }
    });

});
app.get('/project/:id/:name?', function(req, res) {
    var projectID = req.params.id;
    request(API_IP +'/project/' + projectID, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var project = JSON.parse(body);
            res.render('project-single', {
                _: _,
                pageName: 'Project - ' + project.name,
                pageParent: 'Projects',
                moment: moment,
                project: project,
                frameworkDisplay: util.frameworkDisplay
            });
        }
    });

});