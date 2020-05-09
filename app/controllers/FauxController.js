const Faux = require("../models/faux");

exports.test = function(req, res) {
  res.send("Greetings from the faux controller!");
};

exports.faux = function(req, res) {
  var documents = Faux.find({}, null, {sort: {faux_type: 1}}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};
