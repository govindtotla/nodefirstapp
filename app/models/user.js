var mongoose     = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var Schema       = mongoose.Schema;
const UserSchema = new Schema({
  name: { type: String, required: true  },
  email: {  type: String,  required: true },
  password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
