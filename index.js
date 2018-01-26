"use strict";

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

var app = express();
var server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  //console.log(req.hostname);
  res.render('pages/index');
});
app.get('/klocproject', function (req, res) {
  res.render('pages/klocproject');
});
app.get('/about', function (req, res) {
  res.render('pages/about');
});
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

app.post('/form', function (req, res) {
  console.log('selected project is= ' + req.body.selectedProject);
  console.log('selected version is= ' + req.body.selectedVersion);
  res.send(req.body.selectedProject + ' - ' + req.body.selectedVersion);
});

app.listen(PORT, () => {
  console.log('Listening on port= ' + String(PORT));
});
