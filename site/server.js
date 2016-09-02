const express = require('express');
const server  = express();
const bodyParser = require('body-parser');

server.set('view engine','ejs');

server.use('/static', express.static('static'));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended:true}));

exports.init = ()=>{

    return new Promise((resolve, reject)=>{

        server.listen(3010, ()=>{

            resolve(server);

        });

    });

};