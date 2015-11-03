var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo_peer_challenge');
var Schema = mongoose.Schema;
mongoose.model('Person', new Schema({'name':String, 'spirit_animal':String}, {collection:'people'}));
var Person = mongoose.model('Person');
//Person.insert Person.find({})
app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));
app.route('/data')
    .get( function (req,res) {
          var searchy = req.query.peopleSearch;

          if(searchy){
            Person.find({'name':searchy},function (err,data) {
              res.send(data);
            });
          } else {
                Person.find({},function (err,data) {
                  res.send(data);
              });
          }
        })
    .post(function (req,res) {
      var peep = new Person({'name':req.body.peopleName, 'spirit_animal': req.body.peopleAnimal});
      peep.save(function (error) {
          console.log(error);
          res.send(peep);
      });

    });



app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});
