'use strict';
const Card = require('./../models/cards.js');

function deleteCard (id, cb) {
  Card.findByIdAndRemove({"_id": id }, (err, card) => {
    if(err) {
      console.log(`Error with DELETE _id: ${id}: ${err}`);
      return cb(false) ;
    }
    let deleteDate = new Date().toLocaleTimeString('en-US',{hour12: false});
    console.log(`Deleted card with id: ${id} ${deleteDate}`);
    return cb(card) ;
  });
}

function addCard (values, cb) {
  delete values['id'];
  values.status = 'Queue';
  console.log('newCard values: ', values);
  let newCard = new Card(values);
  newCard.save( (err, card, numAffected) => {
    if(err) {
      console.log(`Couldn't add new card. Error message: `, err);
      return cb(false) ;
    }
    if(numAffected > 0) {
      let saveDate = new Date().toLocaleTimeString('en-US',{hour12:false});
      console.log(`New card id ${card._id} added ${saveDate}`);
      return cb(card) ;
    }
  });
}

function updateCard (values, cb) {
  let id = values.id;
  delete values['id'];
  Card.findByIdAndUpdate(id, {
    $set: values
  }, (err, card) => {
    if (err) {
      console.log(`Error updating card _id ${id}: ${err}`);
      return cb(false) ;
    }
    let saveDate = new Date().toLocaleTimeString('en-US',{hour12:false});
    console.log(`Card _id ${id} updated ${saveDate}`);
    return cb(card);
  });
}

function findCard (id, cb) {
  Card.findById(id, (err, card) => {
    if (err) {
      console.log(`Error finding card _id ${id}: ${err} `);
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