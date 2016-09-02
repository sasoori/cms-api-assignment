const express = require('express');
const request = require('request');
const router = require('./router');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('view engine','ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/libs', express.static('libs'));
app.use('/dist', express.static('dist'));
app.use('/static', express.static('static'));

app.listen(3030, ()=>{
    console.log('All is well! PORT: 3030');
});

app.get('/', (req, res)=>{

    var pageNum = req.query.page-1;
    var postCount = req.query.postCount ? req.query.postCount : 5;


    request('http://jsonplaceholder.typicode.com/posts', function (error, response, body) {
        if (!error && response.statusCode == 200) {

            var jsonData = JSON.parse(body);
            var pageLength = Math.ceil(jsonData.length / postCount);
            var page = jsonData.splice(pageNum * postCount, postCount);

            res.render('index', {
                posts: page,
                numPages: pageLength,
                pageNum: pageNum,
                postCount: postCount,
                pageName:'articles'
            });
        }
    });


});