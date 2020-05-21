var mongoose     = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var Schema       = mongoose.Schema;
var PriceSchema   = new Schema({
		lot_number: { type : String , unique : true, required : true, dropDups: true },
		lot_price: Number
	}, { timestamps: true });
module.exports = mongoose.model('Price', PriceSchema);
