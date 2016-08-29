const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name         : String,
    framework    : String,
    description  : String,
    background   : String,
    status       : {type: String, enum: ['ACTIVE', 'INACTIVE', 'DEAD']},
    teamMembers  : [String],
    dateCreated  : {type:Date, default: Date.now},
    languages    : [String]
});

mongoose.model('Project', schema);