var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BrandSchema   = new Schema({
    brand_name: { type : String , unique : true, required : true, dropDups: true },
    brand_short_code : String
});

module.exports = mongoose.model('Brand', BrandSchema);
