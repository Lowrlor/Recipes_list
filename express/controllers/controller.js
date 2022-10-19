const mongoose = require('mongoose');
const List = require('../models/list.model.js');
var fs = require('fs');
var path = require('path');

exports.create = function (req, res) {
  var schema = new List (req.body)
  console.log(schema)
  schema.save()
    .then(() => {
      res.send(schema)
    })
    .catch(err => {
      fs.unlink('./public/images/' + req.body.img, function (err) {
          console.log(err)
      });
      res.send(err)
    })
}
exports.findAll = function (req, res) {
  List.find({ })
    .then((docs) => {
      res.send(docs)
    })
    .catch(err => {
      res.send(err)
    })
}
exports.findOne = function (req, res) {
  List.findOne({ _id: req.params.id })
    .then((docs) => {
      res.send(docs)
    })
    .catch(err => {
      res.send(err)
    })
}
exports.removeOne = function (req, res) {
  List.findOneAndDelete({ _id: req.params.id })
    .then((doc) => {
      fs.unlink('./public/images/' + doc.img, function (err) {
          console.log(err)
      });
      res.send(doc)
    })
    .catch(err => {
      res.send(err)
    })
}
exports.removeAll = function (req, res) {
  List.deleteMany({ })
    .then((docs) => {
      var directory = './public/images'
      fs.readdir(directory, (err, files) => {
        if (err) console.log(err)
        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) console.log(err)
          })
        }
      })
      res.send(docs)
    })
    .catch(err => {
      res.send(err)
    })
}
exports.update = function (req, res) {
  // if (req.body.img) {
  //   var update = {
  //     img: req.body.img,
  //     title: req.body.title,
  //     type: req.body.type,
  //     products: req.body.products,
  //     time: req.body.time,
  //     description: req.body.description
  //   }
  // } else {
  //   var update = {
  //     title: req.body.title,
  //     type: req.body.type,
  //     products: req.body.products,
  //     time: req.body.time,
  //     description: req.body.description
  //   }
  // }
  if (req.body.img.length < 1) {
    req.body.img = undefined
  }
  List.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, upsert: true })
    .then((doc) => {
      console.log(doc)
      res.send(doc).status(200)
    })
    .catch(err => {
      res.send(err).status(400)
    })
}
