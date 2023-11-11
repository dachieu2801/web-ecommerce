const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const ChatRoom = new Schema({
  _id: ObjectId,
  text: [
    {
      message: String,
      is_admin: Boolean,
      date: Date
    }
  ]
  ,
});

module.exports = mongoose.model('ChatRoom', ChatRoom);