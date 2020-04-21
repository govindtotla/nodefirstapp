const Color = require("../models/color");

exports.test = function(req, res) {
  res.send("Greetings from the Test controller!");
};

exports.colors = function(req, res) {
  var documents = Color.find({}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};


exports.delete = function(req, res) {
  var documents = Color.find({}, function(err, docs) {
    if (err) throw err;
    res.send(docs);
    return docs;
  });
};

exports.add = function(req, res) {
  let color = new Color({
    color_name: req.body.color_name,
    color_alias_name: req.body.color_alias_name
  });

  color.save(function(err, color) {
    if (err) {
      console.log("Unsuccessful");
    }
    console.log("Saved!");
  });
};
