var express = require('express');
var app = express();

var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');

var compiler = webpack(config);
var PORTNUM = 3000; //default port

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/test'); //database name
var Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection Error. Database error.'));

var cardSchema = new Schema({
  title: String,
  priority: String,
  status: String,
  createdBy: String,
  assignedTo: String,
});

cardSchema.plugin(timestamps);
mongoose.model('Card', cardSchema);
 var Card = mongoose.model('Card', cardSchema);

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname));
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
  Card.find({}, (err, card) => {
    if (err) return err;
    res.set('Access-Control-Allow-Origin', '*');
    return res.json(card);
  });
});


app.put('/edit/', (req, res) => {
  // now updates a single field
   var reqObject = {};
    for(var key in req.body) {
      if(req.body.hasOwnProperty(key) && key != 'id') {
        reqObject[key] = req.body[key];
      }
    }
  // reqObject is an object with field name and value, i.e., { priority : 'High'}
  Card.findByIdAndUpdate(req.body.id, {
    $set: reqObject
  },
  function (err, card) {
    if (err) return console.log('Error: ', err);
    return res.json(card);
  });
});


app.delete('/delete/', (req, res) => {
  Card.findByIdAndRemove({"_id":req.body.id},
  function (err, card) {
    if (err) return console.log(`Erroror with DELETE: ${err}`);
    return res.json(card);
  });
});

var postsPerSecond = 0; //spam protection
app.post('/', (req, res) => {
  setInterval( () => {
    postsPerSecond = 0;
  }, 1000); //clears every second
  if(postsPerSecond === 0) {
    var body = req.body;
    var newCard = new Card({
      title: body.title || "Title",
      priority: body.priority || "Priority",
      status: body.status || "Queue",
      createdBy: body.createdby || "Created By",
      assignedTo: body.assignedto || "Assigned To",
    });
    newCard.save( (err, data) => {
      if(err) console.log(err);
      else {
        console.log('Successfully saved.');
      }
    });
    postsPerSecond++;
  } else {
    console.log('Could not save. Spam protection invoked.');
  }
});

app.listen(PORTNUM, () => {
  console.log(`now listening on port ${PORTNUM}`);
});
