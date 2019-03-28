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
};


function spotify_this_song(song){
    spotify.search({type: "track", query: song})
    .then(function(response) {
        var results = response.tracks.items
        console.log(results);
        for (var i = 0; i < results.length; i++) {
            var track = results[i];
            console.log("==============================================")
            //artists name
            for (var j = 0; j < track.artists.length; j++) {
                console.log("Artists: " + track.artists[j].name);
            }
            //song name
            console.log("Track: " + track.name);
            //spotify link 
            console.log("Link: " + track.external_urls.spotify); 
            //album name
            console.log("Album: " + track.album.name)
            console.log("==============================================")
        }
    }).catch(function(err){
        console.log(err);
    })

};

function movie_this(movie){
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then
    (function(response) {
        // console.log(response);
        var movie = response.data;
        console.log("==============================================")
        console.log("Title: " + movie.Title);
        console.log("Year Released: " + movie.Year);
        console.log("IMDB: " + movie.Ratings[0].Value);
        console.log("Rotten Tomatoes: " + movie.Ratings[1].Value);
        console.log("Country: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: \n\n" + movie.Plot + "\n");
        console.log("Actors: " + movie.Actors);
        console.log("==============================================")
    })
    .catch(function(err) {
        console.log(err);
    });

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
    movie_this(process.argv.slice(3).join(" "));

}
if (response === "do-what-it-says") {
    do_what_it_says();

}

