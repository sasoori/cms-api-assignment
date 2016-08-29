const server = require('./server');
const database = require('./database');
const config = require('./config');

database.connect()
    .then(server.init)
    .then((server)=>{
        require('./resources')(server);
    })
    .then(()=> {
        console.log('All is well | on port:', config.PORT);
    })
    .catch(function(err) {
        console.log('Catch error:', err);
});