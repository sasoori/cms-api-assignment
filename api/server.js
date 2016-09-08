const express = require('express');
const server  = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

server.use(bodyParser.json());
server.use(cors());
server.use(bodyParser.urlencoded( { extended:true } ));
server.use(expressValidator());
server.use('/article/uploads', express.static('./uploads'));

exports.init = function() {
    server.listen(3010);
    return server;
};
