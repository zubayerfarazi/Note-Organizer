require('dotenv').config();

const serverPort = process.env.PORT || process.env.SERVER_PORT;
const windowMsLimit = process.env.WINDOW_MS || 15 * 60 * 1000;
const limitPerIP = process.env.LIMIT || 15;
const mongooseUri = process.env.MONGOOSE_URI;
const jwtSecretKey = process.env.JWT_SECRET_KEY || "8e787097430201e12e554253e6313394417af9d3a371c09d";
const jwtRefreshKey = process.env.JWT_REFRESH_KEY || "8e787097430201e12e554253e6313394417af9d3a371c09d";
const jwtForgotSecretKey = process.env.JWT_FORGOT_SECRET_KEY || "8e787097430201e12e554253e6313394417af9d3a371c09d";
const smtpUser = process.env.SMTP_USER;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientUrl = process.env.CLIENT_URI;
const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY;
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET;

module.exports = {serverPort, windowMsLimit, limitPerIP, mongooseUri, jwtSecretKey, jwtRefreshKey, jwtForgotSecretKey, smtpUser, smtpPassword, clientUrl, cloudinaryCloudName, cloudinaryApiKey, cloudinaryApiSecret}