var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');

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

module.exports.deleteCard = (theId, cb) => {
  Card.findByIdAndRemove({"_id": theId }, (err, card) => {
    if(err) {
      console.log(`Error with DELETE _id: ${theId}: ${err}`);
      return cb(false) ;
    }
    let deleteDate = new Date();
    console.log(`Deleted card with id: ${theId} ${deleteDate.toLocaleTimeString('en-US', { hour12: false })}`);
    return cb(card) ;
  });
};

module.exports.addCard = (cardValues, cb) => {
  delete cardValues['id'];
  cardValues.status = 'Queue';
  console.log('newCard cardValues: ', cardValues);
  let newCard = new Card(cardValues);
  newCard.save( (err, card, numAffected) => {
    if(err) {
      console.log(`Couldn't add new card. Error message: `, err);
      return cb(false) ;
    }
    if(numAffected > 0) {
      let saveDate = new Date();
      console.log(`New card id ${card._id} added saveDate.toLocaleTimeString('en-US', { hour12: false })`);
      return cb(card) ;
    }
  });
};

module.exports.updateCard = (cardValues, cb) => {
  let theId = cardValues.id;
  delete cardValues['id'];
  Card.findByIdAndUpdate(theId, {
    $set: cardValues
  }, (err, card) => {
    if (err) {
      console.log(`Error updating card _id ${theId}: ${err} `);
      return cb(false) ;
    }
    let saveDate = new Date();
    console.log(`Card _id ${theId} updated ${saveDate.toLocaleTimeString('en-US', { hour12: false })}`);
    return cb(card);
  });
};

module.exports.findCard = (theId, cb) => {
  Card.findById(theId, (err, card) => {
    if (err) {
      console.log(`Error finding card _id ${theId}: ${err} `);
      return cb(false);
    }
    return cb(card);
  });
};

module.exports.findAllCards = (cb) => {
  Card.find({}, (err, cards) => {
    if (err) {
      console.log('error finding cards: ', err);
      return cb(false);
    }
    return cb(cards);
  }
  );
};
