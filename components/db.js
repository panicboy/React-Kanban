'use strict';
const Card = require('./../models/cards.js');

function deleteCard (theId, cb) {
  Card.findByIdAndRemove({"_id": theId }, (err, card) => {
    if(err) {
      console.log(`Error with DELETE _id: ${theId}: ${err}`);
      return cb(false) ;
    }
    let deleteDate = new Date();
    console.log(`Deleted card with id: ${theId} ${deleteDate.toLocaleTimeString('en-US', { hour12: false })}`);
    return cb(card) ;
  });
}

function addCard (cardValues, cb) {
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
}

function updateCard (cardValues, cb) {
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
}

function findCard (theId, cb) {
  Card.findById(theId, (err, card) => {
    if (err) {
      console.log(`Error finding card _id ${theId}: ${err} `);
      return cb(false);
    }
    return cb(card);
  });
}

function findAllCards (cb) {
  Card.find({}, (err, cards) => {
    if (err) {
      console.log('error finding cards: ', err);
      return cb(false);
    }
    return cb(cards);
  }
  );
}

module.exports = {
  deleteCard,
  addCard,
  updateCard,
  findCard,
  findAllCards,
};