require("dotenv").config();

var keys = require('./keys.js');

var response = process.argv[2];

var spotify = new Spotify(keys.spotify);

function concert_this();

function spotify_this_song();

function movie_this();

function do_what_it_says();

if (response === "concert-this") {
    concert_this();

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

