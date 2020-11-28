const randomNumber = (start, stop) => {
  return Math.floor(Math.random() * (stop - start + 1)) + start;
};

module.exports = randomNumber;
