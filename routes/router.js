"use strict";
const express = require('express'),
      Router = express.Router();

const Card = require('./../models/cards.js');

Router.get('/', (req, res) => {
  return res.render('index');
});

Router.get('/data', (req, res) => {
  Card.find({})
  .then((card) => {
    return res.json(card);
  }).catch( (err) => {
    return console.log('Error: ', err);
  });
});

Router.put('/edit', (req, res) => {
  Card.findByIdAndUpdate(req.body.id, {
    $set: req.body
  }).then((card) => {
    return res.json(card);
  }).catch((err) => {
    return console.log('Error: ', err);
  });
});

Router.delete('/delete', (req, res) => {
  Card.findByIdAndRemove({"_id":req.body.id})
  .then((card) => {
    return res.json(card);
  }).catch((err) => {
    return console.log('Error: ', err);
  });
});

let postsPerSecond = 0; //spam protection
setInterval( () => {
  postsPerSecond = 0;
}, 1000); //clears every second

Router.post('/', (req, res) => {
  if(postsPerSecond === 0) {
    let body = req.body;
    let newCard = new Card({
      title: body.title || "Title",
      priority: body.priority || "Priority",
      status: body.status || "Queue",
      createdBy: body.createdby || "Created By",
      assignedTo: body.assignedto || "Assigned To",
    });
    newCard.save( (err, data) => {
      if(err) {
        console.log(`Error Saving. ${err}`);
      }
      else {
        console.log('Successfully saved.');
      }
    });
    postsPerSecond++;
  } else {
    console.log('Could not save. Spam protection invoked.');
  }
});

module.exports = Router;