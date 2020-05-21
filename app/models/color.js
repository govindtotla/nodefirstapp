var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ColorSchema   = new Schema({
    color_name: String,
    color_alias_name: String
}, { timestamps: true });

module.exports = mongoose.model('Color', ColorSchema);
