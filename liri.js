require("dotenv").config();

var chalk = require("chalk");

var axios = require("axios");

var keys = require('./keys.js');

var response = process.argv[2];

var spotify = new Spotify(keys.spotify);

function concert_this(artist);
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(function(response) {
        console.log(response)
    }).catch(function(err){
        console.log(err);
    });


function spotify_this_song();

function movie_this();

function do_what_it_says();

if (response === "concert-this") {
    concert_this(process.argv[3]);

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

