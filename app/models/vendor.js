var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var VendorSchema   = new Schema({
    vendor_name: { type : String , unique : true, required : true, dropDups: true },
    vendor_short_code : String
}, { timestamps: true });

module.exports = mongoose.model('Vendor', VendorSchema);
