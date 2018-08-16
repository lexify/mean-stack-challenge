var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

var PARAM_COLLECTION = "lookups";

var app = express();
app.use(bodyParser.json());

var db;

mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/paramaters", function(err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log("Database connection ready");

  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log('ERROR: ' + reason);
  res.status(code || 500).json({'error': message});
}

app.get('/api/params', function(req, res) {
  db.collection(PARAM_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, 'Failed to get parameters.');
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post('/api/params', function(req, res) {
  var newParam = req.body;
  newParam.createDate = new Date();

  if(!req.body.name) {
    handleError(res, "Invalid user input", 'Must provide a parameter', 400);
  } else {
    db.collection(PARAM_COLLECTION).insertOne(newParam, function(err, docs){
      if (err) {
        handleError(res, err.message, 'Failed to create new param.');
      } else {
        res.status(201).json(docs.ops[0]);
      }
    });
  }
});

app.get("/api/params/:id", function(req, res) {
  db.collection(PARAM_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get params");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/params/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(PARAM_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update params");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/params/:id", function(req, res) {
  db.collection(PARAM_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete params");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});