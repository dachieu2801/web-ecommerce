const env = require('../env')

module.exports = {
  secret: env.SECRET_TOKEN,
  refreshTokenSecret: env.REFRESH_TOKEN,
};
