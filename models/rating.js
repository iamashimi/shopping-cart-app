var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user:{type: String},
    rating:{type: String},
    comment:{type: String}
});

module.exports = mongoose.model('Ratings', schema);
