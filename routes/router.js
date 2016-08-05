"use strict";
const express = require('express'),
      Router = express.Router();

const db = require('../components/db.js');

Router.get('/', (req, res) => {
  return res.render('index');
});

Router.get('/data', (req, res) => {
  db.findAllCards((data) => {
    if(data) {
      res.set('Access-Control-Allow-Origin', '*');
      return res.json(data);
    }
  });
});

Router.put('/edit', (req, res) => {
  console.log('REQ.BODY' + req.body);
   db.updateCard(req.body, (updatedCard) => {
    if(updatedCard) {
      return res.json(updatedCard);
    }
  });
});

Router.delete('/delete', (req, res) => {
  db.deleteCard(req.body.id, (deletedCard) => {
    if(!deletedCard) return console.log('error with delete');
    return res.json(deletedCard);
  });
});

Router.post('/', (req, res) => {
  var body = req.body;
  db.addCard(body, (theNewCard) => {
    if(theNewCard) return console.log('New card: ', theNewCard);
  });
});

module.exports = Router;