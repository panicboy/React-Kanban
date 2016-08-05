var express = require('express');
var app = express();
const db = require('./components/db');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var compiler = webpack(config);
var PORTNUM = 3000; //default port

var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));

app.use(function(req, res, next) {
  console.log('method: ',req.method, ' url: ',req.url);
  next();
 });

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  }
}));

app.get('/', (req, res) => {
  return res.render('index');
});

app.get('/data', (req, res) => {
  db.findAllCards((data)=>{
    if(data) {
      res.set('Access-Control-Allow-Origin', '*');
      return res.json(data);
    }
  });
});

app.put('/edit', (req, res) => {
  db.updateCard(req.body, (updatedCard) => {
    if(updatedCard) return res.json(updatedCard);
  });
});


app.delete('/delete', (req, res) => {
  db.deleteCard(req.body.id, (deletedCard) => {
    if(!deletedCard) return console.log('error with delete');
    return res.json(deletedCard);
  });
});

app.post('/', (req, res) => {
  var body = req.body;
  db.addCard(body, (theNewCard) => {
    if(theNewCard) return console.log('New card: ', theNewCard);
  });
});

app.listen(PORTNUM, () => {
  console.log(`now listening on port ${PORTNUM}`);
});
