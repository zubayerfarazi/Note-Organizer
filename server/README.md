# Express.js Backend Template

A production-ready Express.js backend template with security features, error handling, and best practices.

> **Note:** If you encounter a `whitelist` error with the latest version of `mongoose`, use version `8.1.1` instead. This template is configured to use `mongoose@8.1.1` for compatibility.

## Features

- 🔒 Security features (Helmet, CORS, Rate Limiting, XSS Protection)
- 📝 Request logging with Morgan (Development only)
- 🚦 Input sanitization
- ⚡ Environment configuration
- 🎯 Error handling middleware
- 📦 MongoDB integration ready
- 📤 File upload support with Multer

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (if using database features)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-project-name>
```

2. Install dependencies:
```bash
# Install production dependencies only
npm install

# Install both production and development dependencies
npm install --include=dev
```

3. Create a `.env` file in the root directory:
```env
SERVER_PORT = 3003
WINDOW_MS = 900000
LIMIT = 100
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── middlewares/    # Custom middlewares
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── secret.js       # Environment configuration manager
│   └── app.js          # Express app setup
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── index.js           # Application entry point
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## Packages Used

### Core Dependencies
- `express` (^5.1.0) - Web framework for Node.js
- `mongoose` (^8.1.1) - MongoDB object modeling tool (**recommended**; newer versions may cause whitelist errors)
- `dotenv` (^16.5.0) - Environment variable management

### Security
- `helmet` (^8.1.0) - Security HTTP headers
- `cors` (^2.8.5) - Cross-Origin Resource Sharing
- `express-rate-limit` (^7.5.0) - Rate limiting middleware
- `xss` (^1.0.15) - XSS protection

### Middleware & Utilities
- `http-errors` (^2.0.0) - HTTP error handling
- `multer` (^2.0.1) - File upload handling

### Development Dependencies
- `morgan` (^1.10.0) - HTTP request logger (Development only)
- `nodemon` (^3.1.10) - Auto-restart server during development

## Development vs Production

### Development Mode
- Uses `nodemon` for automatic server restart on file changes
- Includes `morgan` for detailed request logging
- Better debugging capabilities

### Production Mode
- Optimized for performance
- No development tools included
- Minimal logging

To run in different modes:
```bash
# Development mode (with nodemon and morgan)
npm run dev

# Production mode
npm start
```

## Configuration Management

### secret.js
This file serves as a central configuration manager that:
- Loads all environment variables
- Provides sensible defaults for development
- Groups configurations by purpose:
  - `server`: Server-related settings (port, environment)
  - `database`: Database connection settings
  - `security`: Security-related settings (rate limiting, CORS, JWT)
  - `upload`: File upload settings

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with hot reload
- `npm test` - Run tests (when implemented)

## Security Features

- Rate limiting to prevent brute force attacks
- Helmet for setting security HTTP headers
- CORS configuration
- XSS protection
- Input sanitization
- Request size limiting

## Error Handling

The application includes a centralized error handling mechanism that:
- Catches all unhandled errors
- Provides appropriate error responses
- Logs errors for debugging
- Hides sensitive error details in production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 