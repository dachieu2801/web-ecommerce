const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

module.exports = {
  all: async (req, res, next) => {
    try {
      const orders = await Order.find()
      if (!orders || orders.length === 0) {
        res.status(400).json({ message: 'You has no orders' })
      } else {
        res.status(200).json({ orders: orders.reverse() })
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  index: async (req, res, next) => {
    try {
      const orders = await Order.find({ 'user.id': req.query.idUser })
      console.log(orders);
      if (!orders || orders.length === 0) {
        res.status(400).json({ message: 'You has no orders' })
      } else {
        res.status(200).json({ orders })
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  detailOrder: async (req, res, next) => {
    try {
      console.log(req.params);
      const orders = await Order.findById(req.params.id)
      console.log(orders);
      if (!orders || orders.length === 0) {
        res.status(400).json({ message: 'You has no orders' })
      } else {
        res.status(200).json({ orders })
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
}

