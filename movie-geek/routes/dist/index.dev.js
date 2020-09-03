"use strict";

var express = require('express');

var router = express.Router();

var Review = require('../models/Review.model');
/* GET home page */


router.get('/', function (req, res, next) {
  res.render('index');
}); // GET create a review

router.get('/reviews/create', function (req, res, next) {
  res.render('reviews/create-review');
}); 

// POST create a review

router.post('/reviews/create', function (req, res, next) {
  var _req$body = req.body,
      title = _req$body.title,
      movieName = _req$body.movieName,
      director = _req$body.director,
      review = _req$body.review,
      ranking = _req$body.ranking;
      user = req.session.currentUser;
  Review.create({
    title: title,
    movieName: movieName,
    director: director,
    review: review,
    ranking: ranking, 
    user = user["_id"]
  }).then(function () {
    return res.redirect('/');
  })["catch"](function (error) {
    return "Error while creating a new review: ".concat(error);
  });
});
module.exports = router;