var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name:  {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now},   
});

module.exports = mongoose.model('Contact', schema);

