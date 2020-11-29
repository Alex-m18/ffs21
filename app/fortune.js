require('dotenv').config();
const randomNumber = require('./randomNumber');

const fortune = (ctx, body = null, status = 200) => {
  const isBadConnection = process.env.ENABLE_BAD_CONNECTION_IMITATION.toLowerCase === 'true';
  const delay = isBadConnection ? randomNumber(5, 10) * 25 : 0;
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (isBadConnection && (Math.random() > 0.8)) {
            reject(new Error('Something bad happened'));
            return;
          }

          ctx.response.status = status;
          ctx.response.body = body;
          resolve();
      }, delay);
  })
};

module.exports = fortune;
