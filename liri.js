require("dotenv").config();

var chalk = require("chalk");

var axios = require("axios");

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var fs = require("fs");

var moment = require('moment');

var response = process.argv[2];

var spotify = new Spotify(keys.spotify);

function concert_this(artist) {
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        // debugger;
        console.log(artist);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var concerts = results[i];
            console.log("==============================================")
            console.log("Venue: " + concerts.venue.name);
            console.log("Location: " + concerts.venue.city + ", " + concerts.venue.region);
            console.log("Event Date: " + moment(concerts.datetime).format("MM/DD/YYYY"));
            console.log("==============================================")
        };
    }).catch(function (err) {
        console.log(err);
    });
}


function spotify_this_song(song){
    spotify.search({type: "track", query: song})
    .then(function(response) {
        console.log(response.tracks.items);
    }).catch(function(err){
        console.log(err);
    })

}

function movie_this(){

}

function do_what_it_says(){

}

if (response === "concert-this") {
    concert_this(process.argv.slice(3).join(" "));

}
if (response === "spotify-this-song") {
    spotify_this_song(process.argv.slice(3).join(" "));

}
if (response === "movie-this") {
    movie_this();

}
if (response === "do-what-it-says") {
    do_what_it_says();

}

