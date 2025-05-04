# 🚀 Creator Platform

A full-stack web application for managing users and points, with role-based authentication and an admin dashboard.

---

## 🌐 Live Demo

🔗 [Live Deployed App](https://your-live-url.com)  
(Hosted on **Google Cloud Platform** or [Render](https://render.com))

---

## 📁 Project Structure

```
/client      → React frontend
/server      → Node.js + Express backend
```

---

## ✨ Features

### 🔐 Authentication
- Secure user registration and login (JWT-based)
- Role-based access (Admin vs. User)
- Forgot password placeholder

### 👤 User Features
- Sign up / login
- Store JWT in localStorage
- Redirect based on user role

### 🛠️ Admin Features
- View all registered users
- Edit user points (inline editing)
- Role-based dashboard redirect

---

## 🧰 Tech Stack

- **Frontend**: React, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Hosting**: GCP preferred (Render fallback)

---

## 🧑‍💻 Run Locally

### ⚙️ Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### 🔧 Backend Setup

```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=<your_mongo_connection_string>
# JWT_SECRET=<your_jwt_secret>
npm run dev
```

API runs on: `http://localhost:4000`

### 💻 Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## ☁️ Deployment

### Backend Deployment (GCP or Render)

- Push code to GitHub
- Deploy backend with:
  - Google Cloud App Engine
  - Or Render
- Set environment variables:
  - `MONGO_URI`
  - `JWT_SECRET`

### Frontend Deployment

- Build React app:
  ```bash
  npm run build
  ```
- Deploy with:
  - Firebase Hosting
  - GCP Cloud Storage
  - Netlify or Vercel

Make sure `backendURL` in your frontend points to your deployed backend.

---

## 📄 API Endpoints

| Method | Endpoint                        | Description               |
|--------|----------------------------------|---------------------------|
| POST   | `/api/auth/register`            | Register new user         |
| POST   | `/api/auth/login`               | Authenticate user         |
| GET    | `/api/auth/get-user`            | Admin: get all users      |
| PUT    | `/api/auth/change-point/:id`    | Admin: update user points |

---

## 🧪 Sample Admin Credentials

```plaintext
Email: admin@example.com
Password: Admin123!
```

(You can manually mark a user as admin in the database)

---

## 📬 Contact

For issues, please open an issue on [GitHub](https://github.com/your-repo/issues)  
Or reach out at: `youremail@example.com`

---
