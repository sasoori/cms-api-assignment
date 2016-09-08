var mongoose = require('mongoose');

var Schema = mongoose.Schema({

    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    coverImage 	: String

});

mongoose.model('Article', Schema);
