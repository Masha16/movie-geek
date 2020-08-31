const express = require('express');
const router  = express.Router();

const Review = require('../models/Review.model')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET create a review

router.get('/reviews/create', (req, res, next)=> {
  res.render('reviews/create-review')
})

// POST create a review

router.post('/reviews/create', (req, res, next) => {
  const {title, movieName, director, review, ranking} = req.body;
  Review.create({ title, movieName, director, review, ranking })
    .then(() => res.redirect('/'))
    .catch(error => `Error while creating a new review: ${error}`);
});

module.exports = router;
