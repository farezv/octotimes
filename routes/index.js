var express = require('express');
var router = express.Router();
var request = require('request');
var apimeta = require('../api');
var SteamApi = require('steam-webapi');
var User = require('../public/javascripts/user');
var redis = require("redis"),
    client = redis.createClient();

var steamUser;
var currentResponse;
var currentRequest;

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
       currentRequest = req;
       currentResponse = res;
       var user;
       SteamApi.ready(getSteamIdFromApi);


       // Store it in cache

       // Redirect
//       res.redirect('user/' + req.body.username.toString());
   }
});

function getSteamIdFromApi(err) {
    if (err) return console.log(err);
    var steam = new SteamApi();
    steam.resolveVanityURL({vanityurl:currentRequest.body.username}, function(err, result) {
        if (err) {
            console.log(err);
        } else {
            getPlayerProfile(result.steamid);
        }
    });
}

function getPlayerProfile(steamId) {
    var searchUrl = apimeta.getPlayerSummary + steamId;
    request({
        url: searchUrl,
        headers: {
            'User-Agent': 'farezv-steamrc'
        }
    }, getProfileFromApi);
}

function getProfileFromApi(error, reqResponse, body) {
    if(!error && reqResponse.statusCode == 200) {
        var bodyJson = [];
        bodyJson = JSON.parse(body);
        var apiResponse = bodyJson.response;
        var userJson = apiResponse.players[0];
//            console.log(userJson);
        steamUser = new User(userJson.steamid, userJson.personaname, userJson.realname, userJson.profileurl, userJson.avatarfull);
        if (currentResponse != null) {
            currentResponse.redirect(steamUser.personaName);
        }
    }
}

module.exports = router;
