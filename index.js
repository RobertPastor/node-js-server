"use strict";

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const routes = require('./routes/index');

var app = express();
var server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.json()); // to support JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

routes(app);

app.listen(PORT, () => {
  console.log('Listening on port= ' + String(PORT));
});
