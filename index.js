const express = require('express'),
  morgan = require('morgan'), //importing morgan middleware logging library
  fs = require('fs'),
  path = require('path');

const app = express();

//create json object of top 10 movies
let topMovies = [
  {
    title: 'Terminator 2: Judgement Day',
    director: 'James Cameron',
    staring: 'Arnold Schwarzenegger',
    year: 1991,
  },
  {
    title: 'Predator',
    director: 'John McTiernan',
    staring: 'Arnold Schwarzenegger',
    year: 1988,
  },
  {
    title: 'Total Recall',
    director: 'Paul Verhoeven',
    staring: 'Arnold Schwarzenegger',
    year: 1981,
  },
  {
    title: 'The Terminator',
    director: 'James Cameron',
    staring: 'Arnold Schwarzenegger',
    year: 1984,
  },
  {
    title: 'True Lies',
    director: 'James Cameron',
    staring: 'Arnold Schwarzenegger',
    year: 1994,
  },
  {
    title: 'Conan the Barbarian',
    director: 'John Milius',
    staring: 'Arnold Schwarzenegger',
    year: 1982,
  },
  {
    title: 'Commando',
    director: 'Mark L. Lester',
    staring: 'Arnold Schwarzenegger',
    year: 1985,
  },
  {
    title: 'Last Action Hero',
    director: 'John McTiernan',
    staring: 'Arnold Schwarzenegger',
    year: 1993,
  },
  {
    title: 'Eraser',
    director: 'Chuck Russell',
    staring: 'Arnold Schwarzenegger',
    year: 1996,
  },
  {
    title: 'Batman & Robin',
    director: 'Joel Schumacher',
    staring: 'Arnold Schwarzenegger',
    year: 1997,
  },
];

//logging all requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), {
  flags: 'a',
});

app.use(morgan('combined', { stream: accessLogStream }));

//default text response
app.get('/', (req, res) => {
  res.send('Welcome to Nicks movie app!');
});

//returns json object
app.get('/movies', (req, res) => {
  res.json(topMovies);
});

//serving all requests from the public folder
app.use(express.static('public'));

//error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('something broke :(');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});
