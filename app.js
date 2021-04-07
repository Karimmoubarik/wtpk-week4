'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const port = 3000;

// älä tee näin projektissa

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const username = 'foo';
const password = 'bar';

app.use(cookieParser());
app.use(session({
  secret: 'jottain',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60 * 60 * 24},
}));

app.set('views', './views');
app.set('view engine', 'pug');

// älä tee näin projektissa

app.post('/login', (req, res) => {
  const uname = req.body.username;
  const passwd = req.body.password;
  if (uname === username && passwd === password) {
    req.session.kirjautunut = true;
    res.redirect('/secret');
  } else {
    res.redirect('/form');
  }
});

// älä tee näin projektissa

app.get('/', (req, res) => {
  res.render('home');
});

// älä tee näin projektissa

app.get('/form', (req, res) => {
  res.render('form');
});

app.get('/secret', (req, res) => {
  if (req.session.kirjautunut) {
    res.render('secret');
  } else {
    res.redirect('/form');
  }
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

// älä tee näin projektissa

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
