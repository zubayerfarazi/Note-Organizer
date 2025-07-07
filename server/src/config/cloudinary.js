const { cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret } = require('../secret');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

module.exports = cloudinary;