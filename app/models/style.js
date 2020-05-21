var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StyleSchema   = new Schema({
    style_name: { type : String , unique : true, required : true, dropDups: true },
    style_short_code : String
});

module.exports = mongoose.model('Style', StyleSchema);
