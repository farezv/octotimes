var express = require('express');
var router = express.Router();
var request = require('request');
var apimeta = require('../api');
var SteamApi = require('steam-webapi');
var User = require('../public/javascripts/user');
var steamUser;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Steam Report Card' });
});

/* GET user page. */
router.get('/:username?', function(req, res) {
    console.log(steamUser);
    res.render('user', { user: steamUser });
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
                   getPlayerProfile(result.steamid, res);
               }
           });

       });

       // Store it in cache

       // Redirect
//       res.redirect('user/' + req.body.username.toString());
   }
});

function getPlayerProfile(steamId, res) {
    var searchUrl = apimeta.getPlayerSummary + steamId;
    request({
        url: searchUrl,
        headers: {
            'User-Agent': 'farezv-steamrc'
        }
    }, function(error, reqResponse, body) {
        if(!error && reqResponse.statusCode == 200) {
            var bodyJson = [];
            bodyJson = JSON.parse(body);
            var apiResponse = bodyJson.response;
            var userJson = apiResponse.players[0];
//            console.log(userJson);
            steamUser = new User(userJson.steamid, userJson.personaname, userJson.realname, userJson.profileurl, userJson.avatarfull);
            res.redirect(steamUser.personaName);
        }
    });
}

module.exports = router;
