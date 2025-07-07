const xss = require("xss");

function sanitizeInput(req, res, next) {
   console.log('Sanitizing input...');
  if (req.body) {
    const keys = Object.keys(req.body);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof req.body[key] === "string") {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  if (req.query) {
    const keys = Object.keys(req.query);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof req.query[key] === "string") {
        req.query[key] = xss(req.query[key]);
      }
    }
  }

  if (req.params) {
    const keys = Object.keys(req.params);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (typeof req.params[key] === "string") {
        req.params[key] = xss(req.params[key]);
      }
    }
  }

  next();
}

module.exports = sanitizeInput;
