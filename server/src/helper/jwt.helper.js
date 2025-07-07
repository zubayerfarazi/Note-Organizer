const jwt = require("jsonwebtoken");

const generateJsonWebToken = (payload, secretKey, expiresIn) => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error generating JSON Web Toke: ", error.message);
  }
};

module.exports = generateJsonWebToken;