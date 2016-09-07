const server = require('./server');
const database = require('./database');
const config = require('./config');

database.connect()
    .then(server.init)
    .then(function(server){
        require('./resources')(server);
    })
    .then(function(){
        console.log('All is well | on port:', config.PORT);
    })
    .catch(function(err) {
        console.log('Catch error:', err);
});