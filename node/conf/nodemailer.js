const env = require('../env')

const nodemailer = require('nodemailer')

module.exports = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.USER_NODEMAILER,
    pass: env.PASSWORD_NODEMAILER
  }
})