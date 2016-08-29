const mongoose = require('mongoose');


exports.connect = ()=>{

    return new Promise((resolve, reject)=>{

        mongoose.connect('mongodb://localhost/cms-assignment');

        mongoose.connection.on('error', (err)=>{

            console.log('Mongo error: ', err);
            reject(err);

        });

        mongoose.connection.once('open', ()=>{

            resolve();

        });

    });

};