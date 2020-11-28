const randomNumber = require('./randomNumber');

const fortune = (ctx, body = null, status = 200) => {
  // Uncomment for delay
  const delay = randomNumber(5, 10) * 25;
  //const delay = 0;
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          // Uncomment for error generation
          // if (Math.random() > 0.8) {
          //     reject(new Error('Something bad happened'));
          //     return;
          // }

          ctx.response.status = status;
          ctx.response.body = body;
          resolve();
      }, delay);
  })
};

module.exports = fortune;
