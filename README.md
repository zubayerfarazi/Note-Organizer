# 📝 Note Organizer App

A full-featured MERN (MongoDB, Express.js, React, Node.js) stack note-taking application built with TypeScript. This app allows users to register and securely manage personal notes with images, categories, filtering, pagination, and search functionality.

## 🚀 Features

### ✅ Authentication
- Secure user registration and login via email verification
- Access token and refresh token stored in cookies
- Protected routes (notes & categories accessible only by authenticated users)

### ✅ Notes
- Create, read, update, and delete (CRUD) personal notes
- Add rich content to notes including **images**
- Search notes by title or content
- Paginated notes view

### ✅ Categories
- Create categories
- Filter notes by selected categories

### ✅ UI/UX
- Fully responsive layout (mobile-friendly)
- Clean and user-friendly interface built with React
- Toast notifications and modals for better user interaction

## 🛠 Tech Stack

- **Frontend:** React, TypeScript, Axios, Tailwind CSS
- **Backend:** Node.js, Express.js, TypeScript, MongoDB (Mongoose)
- **Authentication:** JWT (Access/Refresh), Email Verification (SMTP)
- **Image Upload:** Cloudinary
- **Dev Tools:** Vite, ESLint, Prettier

---

## 📦 Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/note-organizer.git
cd note-organizer

🔧 Backend Setup (/server)
📄 Create .env File in the server Folder

SERVER_PORT=3003
WINDOW_MS=900000
LIMIT=100

MONGOOSE_URI=your_mongodb_uri

JWT_SECRET_KEY=your_access_token_secret
JWT_REFRESH_KEY=your_refresh_token_secret
JWT_FORGOT_SECRET_KEY=your_forgot_password_secret

SMTP_USER=your_email@example.com
SMTP_PASSWORD=your_email_password

CLIENT_URI=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

🎨 Frontend Setup (/client)
📄 Create .env File in the client Folder

VITE_API_BASE_URL=http://localhost:3003/api/v1
