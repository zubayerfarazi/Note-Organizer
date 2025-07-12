const { windowMsLimit, limitPerIP } = require('./secret');
const sanitizeInput = require('./middlewares/sanitizeInput');

const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const createError = require('http-errors');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require("cookie-parser");
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
const noteRoute = require('./routes/note.route');
const { categoryRoute } = require('./routes/category.route');

// const limiter = rateLimit({
// 	windowMs: windowMsLimit,
// 	limit: limitPerIP,
// 	message: "Too many requests, please try again later.",
//   headers: true,
//   standardHeaders: "draft-7",
//   legacyHeaders: false,
// })

const app = express();

app.use(
  cors({
    origin: "https://note-organizer-frontend.onrender.com",
    credentials: true,              
  })
);
app.use(morgan('dev'));
// app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeInput);
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).send("<p>Welcome to the server!</p>");
});

app.use("/api/v1", userRoute);
app.use("/api/v1", authRoute);
app.use("/api/v1", noteRoute);
app.use("/api/v1", categoryRoute);

app.use((req, res, next) => {
  next(createError(404, "Route is not found"));
});

app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});
module.exports = app;