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
        console.log("\n\nShowing results for: " + chalk.hex('#ff19f7').underline(artist));
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var concerts = results[i];
            console.log("==============================================")
            console.log(chalk.magenta("Venue: ") + chalk.blueBright(concerts.venue.name));
            console.log(chalk.magenta("Location: ") + chalk.blueBright(concerts.venue.city) + ", " + chalk.blueBright(concerts.venue.region));
            console.log(chalk.magenta("Event Date: ") + chalk.blueBright(moment(concerts.datetime).format("MM/DD/YYYY")));
            console.log("==============================================\n")
        };
    }).catch(function (err) {
        console.log(err);
    });
};


function spotify_this_song(song){
    spotify.search({type: "track", query: song})
    .then(function(response) {
        console.log("\n\nShowing results for: " + chalk.hex('#059322').underline(song));
        var results = response.tracks.items
        for (var i = 0; i < results.length; i++) {
            var track = results[i];
            console.log("==============================================")
            //artists name
            for (var j = 0; j < track.artists.length; j++) {
                console.log(chalk.yellowBright("Artists: ") + chalk.green(track.artists[j].name));
            }
            //song name
            console.log(chalk.yellowBright("Track: ") + chalk.green(track.name));
            //spotify link 
            console.log(chalk.yellowBright("Link: ") + chalk.green(track.external_urls.spotify)); 
            //album name
            console.log(chalk.yellowBright("Album: ") + chalk.green(track.album.name));
            console.log("==============================================\n")
        }
    }).catch(function(err){
        console.log(err);
    })

};

function movie_this(movie){
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then
    (function(response) {
        console.log("\n\nShowing results for: " + chalk.hex('#ffde26').underline(movie));
        var search = response.data;
        console.log("==============================================")
        console.log(chalk.hex('#ff6302')("Title: ") + chalk.hex('##f23f3c')(search.Title));
        console.log(chalk.hex('#ff6302')("Year Released: ") + chalk.hex('##f23f3c')(search.Year));
        console.log(chalk.hex('#ff6302')("IMDB: ") + chalk.hex('##f23f3c')(search.Ratings[0].Value));
        console.log(chalk.hex('#ff6302')("Rotten Tomatoes: ") + chalk.hex('##f23f3c')(search.Ratings[1].Value));
        console.log(chalk.hex('#ff6302')("Country: ") + chalk.hex('##f23f3c')(search.Country));
        console.log(chalk.hex('#ff6302')("Language: ") + chalk.hex('##f23f3c')(search.Language));
        console.log(chalk.hex('#ff6302')("Plot: \n\n") + chalk.hex('##f23f3c')(search.Plot + "\n"));
        console.log(chalk.hex('#ff6302')("Actors: ") + chalk.hex('##f23f3c')(search.Actors));
        console.log("==============================================\n")
    })
    .catch(function(err) {
        console.log(err);
    });

}

function do_what_it_says(){
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
        }
        var output = data.split(",");
        toDo = output[0];
        search = output[1];
        if (toDo === "concert-this") {
            concert_this(search);
        
        }
        if (toDo === "spotify-this-song") {
            spotify_this_song(search);
        
        }
        if (toDo === "movie-this") {
            movie_this(search);
        
        }

    })

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

