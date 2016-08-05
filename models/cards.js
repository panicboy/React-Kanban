const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');

var Promise = require("bluebird");
Promise.promisifyAll(mongoose);

const cardSchema = new Schema({
  title: String,
  priority: String,
  status: String,
  createdBy: String,
  assignedTo: String,
});
cardSchema.plugin(timestamps);

module.exports = mongoose.model('Card', cardSchema);
