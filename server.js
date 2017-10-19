var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('playlist', ['playlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
// app.get('/', function (req, res) {
//   res.send("Hello world from server.js")
// });

app.get('/playlist', function (req, res) {
  console.log("I received a GET request")

  db.playlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
  //dummy data
  // artist1 = {
  //   name: "Smashing Pumpkins",
  //   song: "Cherub Rock",
  //   album: "Siamese Dream"
  // };
  //
  // artist2 = {
  //   name: "Sugar",
  //   song: "Hoover Dam",
  //   album: "Copper Blue"
  // };
  //
  // artist3 = {
  //   name: "Velvet Crush",
  //   song: "Hold Me Up",
  //   album: "Teenage Symphonies to God"
  // };
  //
  // var playlist = [artist1, artist2, artist3];
  // res.json(playlist);
});

app.post('/playlist', function (req, res) {
  console.log(req.body);
  db.playlist.insert(req.body, function (err, doc) {
    res.json(doc);
  });
});

app.delete('/playlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.playlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/playlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.playlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/playlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  db.playlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, song: req.body.song, album: req.body.album}},
    new: true}, function (err, doc) {
      res.json(doc);
    });
});

app.listen(3000);
console.log("Server running on port 3000");
