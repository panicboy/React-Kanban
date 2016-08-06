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
    return res.status(404).send();
  });
});

Router.put('/edit', (req, res) => {
   db.updateCard(req.body, (updatedCard) => {
    if(updatedCard) {
      return res.status(200).send();
    }
    return res.status(404).send();
  });
});

Router.delete('/delete', (req, res) => {
  db.deleteCard(req.body.id, (deletedCard) => {
    if(!deletedCard) return res.status(404).send();
    return res.status(200).send();
  });
});

Router.post('/', (req, res) => {
  var body = req.body;
  db.addCard(body, (theNewCard) => {
    if(theNewCard) return res.status(200).send();
    return res.status(404).send();
  });
});

module.exports = Router;