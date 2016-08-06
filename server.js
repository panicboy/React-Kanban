"use strict";
const express = require('express');
const app = express();

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const compiler = webpack(config);

const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test'); //database name

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error. Database error.'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname));
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  }
}));

const Routes = require('./routes/router');

app.use('/', Routes);

const PORTNUM = process.env.PORT || 3000; //default port

app.listen(PORTNUM, () => {
  console.log(`Server now listening on port ${PORTNUM}`);
});
