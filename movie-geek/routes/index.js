const express = require('express');
const router  = express.Router();

const Review = require('../models/Review.model')
const User = require('../models/User.model')


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

// GET create a review

router.get('/reviews/create', (req, res, next)=> {
  if (!req.session.currentUser) {
    res.redirect('/login'); // not logged-in
    return;
  }
  res.render('reviews/create-review', {userInSession: req.session.currentUser });
})

// POST create a review

router.post('/reviews/create', (req, res, next) => {
  const {title, movieName, director, review, ranking} = req.body;
  Review.create({ title, movieName, director, review, ranking, user: req.session.currentUser['_id'] })
    .then(() => res.redirect('/userProfile'))
    .catch(error => `Error while creating a new review: ${error}`);
});

// GET route to display all the reviews made 

router.get('/reviews', (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login'); // not logged-in
    return;
  }
  {
  Review.find()
  .populate('user')
  .then(allReviewsFromDB => { 
    // From allReviewsFromDB --> find the user associated with the id
    // look into using .populate() and how that will help
    // Before you send anything with res.render(), make sure you have access to the user's name

    res.render('reviews/reviews', {reviews: allReviewsFromDB})
  })
  .catch(error => console.log('Error while getting the reviews from the DB: ', error)) 
}
})

// GET route to EDIT

router.get('/userProfile/:id/edit', (req, res) => {
  const { id } = req.params;
 
  Review.findById(id)
    .then(reviewToEdit => {
      res.render('reviews/edit-review', reviewToEdit);
    })
    .catch(error => console.log(`Error while getting a single book for edit: ${error}`));
});

// POST route to EDIT

router.post('/userProfile/:id/edit', (req, res) => {
  const { id } = req.params;
  const { title, movieName, director, review, ranking } = req.body;
 
  Review.findByIdAndUpdate(id, { title, movieName, director, review, ranking }, { new: true })
    .then(updatedReview => res.redirect('/userProfile'))
    .catch(error => console.log(`Error while updating a single book: ${error}`));
});

// POST route to DELETE 

router.post('/userProfile/:id/delete', (req, res) => {
  const { id } = req.params;
 
  Review.findByIdAndDelete(id)
    .then(() => res.redirect('/userProfile'))
    .catch(error => console.log(`Error while deleting a book: ${error}`));
});

module.exports = router;
