
var mongoose = require('mongoose');

var Schema = new mongoose.Schema({

    nickname: String,
    email: { type : String, unique : true, required:true },
    password: String,
    dateCreated: { type:Date, default:Date.now},
    tokens: [
        {
            token: String,
            expires: {
                type: Date,
                default : function(){ return Date.now() + 1000*60*60*24*14 }
            }
        }
    ]

});

mongoose.model('Account', Schema);
