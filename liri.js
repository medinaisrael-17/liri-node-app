require("dotenv").config();

//chalk to make it look nicer
var chalk = require("chalk");

//axios to retrieve information from api's
var axios = require("axios");

//require a file called that will give us 
//our spotify keys privately
var keys = require('./keys.js');

//spotify api
var Spotify = require('node-spotify-api');

//internal package that allows us to read a file
var fs = require("fs");

//moment is a npm package that allows us to format time
var moment = require('moment');

//variable set to what the user wants to do 
//is followed after liri.js
var response = process.argv[2];

//create a new spotify search using our keys
var spotify = new Spotify(keys.spotify);


//concert this function to look up concerts
function concert_this(artist) {
    //url to give to our axios
    queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    //call axios to retrieve info
    axios.get(queryUrl).then(function (response) {
        //start of our information being displayed
        console.log("\n\nShowing results for: " + chalk.hex('#ff19f7').underline(artist));
        //set results to response and then the data array that is included in our response
        var results = response.data;
        //for loop to display our data
        for (var i = 0; i < results.length; i++) {
            var concerts = results[i];
            //show the data
            console.log("==============================================")
            console.log(chalk.magenta("Venue: ") + chalk.blueBright(concerts.venue.name));
            console.log(chalk.magenta("Location: ") + chalk.blueBright(concerts.venue.city) + ", " + chalk.blueBright(concerts.venue.region));
            console.log(chalk.magenta("Event Date: ") + chalk.blueBright(moment(concerts.datetime).format("MM/DD/YYYY")));
            console.log("==============================================\n")
        };
    }).catch(function (err) {
        //log error if caught
        console.log(err);
    });
};

//spotify this to search matching songs on spotify
function spotify_this_song(song){
    spotify.search({type: "track", query: song})
    .then(function(response) {
        //start of info
        console.log("\n\nShowing results for: " + chalk.hex('#059322').underline(song));
        var results = response.tracks.items
        //for loop to display the info given back from spotify
        for (var i = 0; i < results.length; i++) {
            var track = results[i];
            console.log("==============================================")
            //to generate a list of artists
            for (var j = 0; j < track.artists.length; j++) {
                console.log(chalk.yellowBright("Artist: ") + chalk.green(track.artists[j].name));
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

//movie this function to look up info on a given movie
function movie_this(movie){
    //axios to retrieve info about the movie
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then
    (function(response) {
        //start of the info
        console.log("\n\nShowing results for: " + chalk.hex('#ffde26').underline(movie));
        var search = response.data;
        //everything that is needed
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

//do what it says function to read what is in our random.txt and perform its instructions
function do_what_it_says(){
    //fs.readfile to read the file we give it
    fs.readFile("random.txt", "utf8", function(err, data){
        if (err) {
            return console.log(err);
        }
        //split the text in the file by any commas
        var output = data.split(",");
        toDo = output[0];
        search = output[1];
        //if the first part of the data array is x, do y 
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


//evaluate the response given by the user
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

