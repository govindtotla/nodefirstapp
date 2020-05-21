var mongoose     = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var Schema       = mongoose.Schema;
var StoneSchema   = new Schema({
		stone_name: { type : String , unique : true, required : true, dropDups: true },
		store_category_id: Number,
		web_stone_id: String,
		color_id: { type: Array, required : true },
		faux_id: { type : String , required : true},
		stone_image: { type : String }
	}, { timestamps: true });
module.exports = mongoose.model('Stone', StoneSchema);
