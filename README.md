# 📝 Note Organizer App

A full-featured **Note Organizer App** built with the **MERN Stack** and **TypeScript**. This app allows users to register and log in securely, create notes and categories, and manage their personal content with ease. The application includes image upload, authentication, and email-based password reset features.

---

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, Vite
- **Backend**: Node.js, Express, TypeScript, MongoDB
- **Authentication**: JWT (Access, Refresh, Forgot Password Tokens)
- **Image Upload**: Cloudinary
- **Email**: Nodemailer (SMTP)

---

---

## 🔐 Environment Variables

### ✅ Server `.env` example (`server/.env`)

```env for server
SERVER_PORT=
WINDOW_MS=
LIMIT=
MONGOOSE_URI=

JWT_SECRET_KEY=your_access_secret
JWT_REFRESH_KEY=your_refresh_secret
JWT_FORGOT_SECRET_KEY=your_forgot_secret

SMTP_USER=youremail@example.com
SMTP_PASSWORD=your_email_password

CLIENT_URI=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret


```env for client
VITE_API_BASE_URL=http://localhost:3003/api/v1
