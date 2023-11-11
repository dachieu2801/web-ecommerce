const mongoose = require('mongoose');

const env = require('../env')
async function main() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log('success');

  } catch (err) {
    console.log('connect  failure');
  }
}

module.exports = { main }

