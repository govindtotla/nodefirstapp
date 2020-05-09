var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FauxSchema   = new Schema({
    faux_type: String,
    faux_value : String
}, { collection: 'faux' });

module.exports = mongoose.model('Faux', FauxSchema);
