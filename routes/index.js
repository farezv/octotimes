var express = require('express');
var router = express.Router();
var apimeta = require('../apimeta');
var SteamApi = require('steam-webapi');
var User = require('../public/javascripts/user');

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

       // Otherwise, make api calls
       SteamApi.key = apimeta.key;
       var user;
       SteamApi.ready(function(err) {
           if (err) return console.log(err);
           var steam = new SteamApi();
           steam.resolveVanityURL({vanityurl:req.body.username}, function(err, result) {
               if (err) {
                   console.log(err);
               } else {
                   var json = getPlayerProfile(result.steamid);
               }
           });

       });

       // Store it in cache

       // Redirect
       res.redirect('user/' + req.body.username.toString());
   }
});

function getPlayerProfile(steamId) {
    
}

module.exports = router;
