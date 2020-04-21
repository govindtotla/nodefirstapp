var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StoneSchema   = new Schema({
    stone_name: String,
    store_category_id: Number,
    color_id: String,
    faux_id: String
});

module.exports = mongoose.model('Stone', StoneSchema);
