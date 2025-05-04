# 🚀 Creator Platform

A full-stack web application for managing users and points, with role-based authentication and an admin dashboard.

---

## 🌐 Live Demo

🔗 [Live Deployed App](https://creator-seven-chi.vercel.app/)  
(Hosted on **Google Cloud Platform** or [Render](https://creator-vr5k.onrender.com))

---

## 📁 Project Structure

```
/     → React frontend
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
- **Hosting**: Render 

---

## 🧑‍💻 Run Locally

### ⚙️ Prerequisites

- Node.js & npm
- MongoDB (local or Atlas)

### 🔧 Backend Setup

```bash
cd server
npm install
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
  - Render
- Set environment variables:
  - `MONGO_URI`
  - `JWT_SECRET`

### Frontend Deployment

- Build React app:
  ```bash
  npm run build
  ```
- Deploy with:
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

## 🧪 Sample User Credentials

```plaintext
Email: user@example.com
Password: User123
```

## 🧪 Sample Admin Credentials

```plaintext
Email: admin@example.com
Password: Admin123
```

(You can manually mark a user as admin in the database)

---


