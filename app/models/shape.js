var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ShapeSchema   = new Schema({
    name: String    
});

module.exports = mongoose.model('Shape', ShapeSchema);
