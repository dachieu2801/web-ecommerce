const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  role: { type: String, required: true, },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone number required']
  },
  fullname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  hashPassword: {
    type: String,
    required: true
  },
  cart: [
    {
      product: Object,
      count: Number
    }
  ],
});

module.exports = mongoose.model('User', User);