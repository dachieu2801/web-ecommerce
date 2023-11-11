const User = require('../models/user');
const Product = require('../models/product');
const ChatRoom = require('../models/chatRoom');
const mongoose = require('mongoose');

module.exports = {
  index: async (req, res, next) => {
    try {
      const chatRooms = await ChatRoom.find({})
      res.status(200).json({ chatRooms: chatRooms.reverse() })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  createRoom: async (req, res, next) => {
    try {
      console.log('a');
      const _id = new mongoose.Types.ObjectId
      const chatRoom = new ChatRoom({
        _id,

      })
      await chatRoom.save()
      res.status(200).json({ idRoom: _id })

    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  getRoom: async (req, res, next) => {
    try {
      const { roomId } = req.query
      const chatRoom = await ChatRoom.findById(roomId)
      res.status(200).json({ text: chatRoom.text })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
}
