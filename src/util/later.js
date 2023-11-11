const later = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

module.exports = later;
