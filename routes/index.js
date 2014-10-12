var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Steam Report Card' });
});

/* GET user page. */
router.get('/:username?', function(req, res) {
    res.render('user', { user: req.params.username });
});

router.post('/rc', function(req, res) {
   if(!req.body.username) {
       res.render('error', {message: 'Please enter a valid username' });
   } else {
       // Search cache first

       // If found, redirect

       // Otherwise, make api call

       // Store it in cache

       // Redirect
       res.redirect(req.body.username.toString());
   }
});

module.exports = router;
