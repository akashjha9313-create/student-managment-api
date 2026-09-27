const logger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const time = new Date().toLocaleTimeString();

  console.log(`[${time}] ${method} request to ${url}`);
  next();
};

module.exports = logger;