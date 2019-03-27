require("dotenv").config();

var chalk = require("chalk");

var axios = require("axios");

var keys = require('./keys.js');

var Spotify = require('node-spotify-api');

var response = process.argv[2];

var spotify = new Spotify(keys.spotify);

function concert_this(artist) {
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function (response) {
        // debugger;
        console.log(artist);
        var results = response.data;
        console.log(response.data);
        for (var i = 0; i < results.length; i++); {
            console.log("Venue: " + results.venue.name);
            console.log("Location: " + results.venue.city + ", " + results.venue.region);
        };
        // console.log(artist);
        // console.log(response);
        // console.log("Venue: " + response.venue.name);
        // console.log("Location: " + response.venue.city + ", " + response.VenueData.region);
    }).catch(function (err) {
        console.log(err);
    });
}


function spotify_this_song(){

}

function movie_this(){

}

function do_what_it_says(){

}

if (response === "concert-this") {
    concert_this(process.argv.slice(3).join(" "));

}
if (response === "spotify-this-song") {
    spotify_this_song();

}
if (response === "movie-this") {
    movie_this();

}
if (response === "do-what-it-says") {
    do_what_it_says();

}

