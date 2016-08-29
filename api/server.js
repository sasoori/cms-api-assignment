const express = require('express');
const server  = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

server.use(bodyParser.json());
server.use(cors());
server.use(bodyParser.urlencoded({extended:true}));
server.use(expressValidator());

exports.init = ()=>{

    server.listen(3010, '0.0.0.0', function() {
    });

    return server;

};

exports.getServer = ()=>{



};
