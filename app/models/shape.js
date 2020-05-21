var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ShapeSchema   = new Schema({
    shape_name: String,
    if_ebay : Number
}, { timestamps: true });

module.exports = mongoose.model('Shape', ShapeSchema);
