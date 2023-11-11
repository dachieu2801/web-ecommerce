const User = require('../models/user');
const Product = require('../models/product');

module.exports = {
  getcart: async (req, res, next) => {
    try {
      const { idUser } = req.query
      let cart = []
      const user = await User.findById(idUser)
      if (!user || user.length === 0) {
        throw new Error('User not exist')
      } else {
        cart = user.cart
        // console.log(cart);
      }
      res.status(200).json({ cart })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },

  addCart: async (req, res, next) => {
    try {
      console.log(req.query);
      const { count, idProduct, idUser } = req.query
      const product = await Product.findById(idProduct)
      const user = await User.findById(idUser)
      if (!user || user.length === 0) {
        throw new Error('User not exist')
      } else {
        let carts = [...user.cart]
        if (carts.length === 0 || !carts) {
          carts = [{ product, count }]
        } else {
          const index = carts.findIndex(cart => cart.product._id.toString() === idProduct)
          if (index === -1) {
            carts.push({ product, count })
          } else {
            carts[index].count += Number(count)
          }
        }
        user.cart = carts
        await user.save()
        res.status(200).json({ message: 'oke' })
      }
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  },
  updateCart: (req, res, next) => {
    cartServer(req, res, next, 'update')
  },
  
  removeInCart: (req, res, next) => {
    cartServer(req, res, next)
  },

}

async function cartServer(req, res, next, update) {
  try {
    const { idProduct, idUser } = req.query
    let count = update ? req.query.count : null
    const user = await User.findById(idUser)
    if (!user || user.length === 0) {
      throw new Error('User not exist')
    } else {
      const index = user.cart.findIndex(cart => cart.product._id.toString() === idProduct)
      if (index === -1) {
        throw new Error('Product not exist')
      } else {
        update ? (user.cart[index].count = count) : user.cart.splice(index, 1)
      }
    }
    await user.save()
    res.status(200).json({ message: 'oke' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
