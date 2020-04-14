var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ColorSchema   = new Schema({
    color_name: String,
    color_alias_name: String
});

module.exports = mongoose.model('Color', ColorSchema);
