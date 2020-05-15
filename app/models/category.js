var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CategorySchema   = new Schema({
    name: String,
    ebay_id: Number,
	store_id:Number
});

module.exports = mongoose.model('Category', CategorySchema);
