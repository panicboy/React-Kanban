var express = require('express');
var app = express();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var compiler = webpack(config);
var PORTNUM = 3000;

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var cardSchema = Schema({
  title: String,
  priority: String,
  status: String,
  createdBy: String,
  assignedTo: String,
});
var Card = mongoose.model('Card', cardSchema);

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {colors: true}
}));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/data', (req, res) => {
  Card.find({}, (err, card) => {
    if (err) return err;
    return res.json(card);
  });
});

app.post('/', (req, res) => {
  var body = req.body;
  var newCard = new Card({
    title:body.title,
    priority: body.priority,
    status: "Queue",
    createdBy: body.createdby,
    assignedTo: body.assignedto
  });
  newCard.save( (err, data) => {
    if(err) console.log(err);
    else {
      console.log(`Saved : ' + ${data}`);
    }
  });
});

app.listen(PORTNUM, () => {
  console.log('now listening on port ' + PORTNUM);
});
