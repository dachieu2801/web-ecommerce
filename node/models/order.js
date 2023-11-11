const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = mongoose.ObjectId;
const Order = new Schema({
  orders: Array,
  user: Object,
  total: String,
});

module.exports = mongoose.model('Order', Order);