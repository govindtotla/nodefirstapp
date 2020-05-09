var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ShapeSchema   = new Schema({
    shape_name: String,
    if_ebay : Number
});

module.exports = mongoose.model('Shape', ShapeSchema);
