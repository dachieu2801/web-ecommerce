const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Evaluate = new Schema({
  idProduct: String,
  idUser: String,
  fullname: String,
  content: String,
  star: Number,
}, { timestamps: true });

module.exports = mongoose.model('Evaluate', Evaluate);