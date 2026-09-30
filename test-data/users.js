
require('dotenv').config();

module.exports = {
  users: {
    standard: {
      username: process.env.SAUCE_USERNAME,
      password: process.env.SAUCE_PASSWORD,
    },
    lockedOut: {
      username: process.env.SAUCE_LOCKED_USERNAME || 'locked_out_user',
      password: process.env.SAUCE_PASSWORD,
    },
  },
};
