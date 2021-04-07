'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./utils/pass')
const app = express();
const port = 3000;

const loggedIn = (req, res, next) => {
  if(req.user){
    next()
  } else {
    res.redirect('/form')
  }
};

// älä tee näin projektissa

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const username = 'foo:';
const password = 'bar';

app.use(cookieParser());
app.use(session({
  secret: 'jottain',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 24},
}));

app.use(passport.initialize());
app.use(passport.session());

app.set('views', './views');
app.set('view engine', 'pug');

// älä tee näin projektissa

app.post('/login',
    passport.authenticate('local', {failureRedirect: '/form'}),
    (req, res) => {
      console.log('success');
      res.redirect('/secret');
});

// älä tee näin projektissa

app.get('/', (req, res) => {
  res.render('home');
});

// älä tee näin projektissa

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', loggedIn, (req, res) => {
  res.render('secret')
});

// älä tee näin projektissa

app.get('/setCookie/:clr', (req, res) => {
  res.cookie('color', req.params.clr, {httpOnly: true}).send('cookie set');
});

app.get('/readCookie', (req, res) => {
  console.log('Cookies: ', req.cookies.color);
  res.send('cookie read');
});

// älä tee näin projektissa

app.get('/deleteCookie', (req, res) => {
  res.clearCookie('color');
  res.send('cookie deleted');
});

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// älä tee näin projektissa

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
