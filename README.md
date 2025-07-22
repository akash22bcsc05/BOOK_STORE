# 📚 Book Store Management App

An elegant full-stack web application for managing a book inventory and simulating a modern online bookstore experience. It allows users to browse, search, favorite, add to cart, and order books — with real-time order tracking!

Built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), this app blends functionality with a clean, responsive UI.

---

## ✨ Key Features

- 📖 **Book Listings** — View all available books in a clean, card-based layout.
- ❤️ **Add to Favorites** — Mark your favorite books for quick access later.
- 🛒 **Add to Cart** — Select multiple books and manage your cart seamlessly.
- 📦 **Place Orders** — Order books directly from the app.
- 🔄 **Real-time Order Updates** — Track your order status live as it gets processed.
- ➕ **Add New Books** — Easily create new book entries (admin only).
- ❌ **Delete Books** — Remove outdated or unwanted books (admin only).
- 🧠 **REST API** — Backend designed with scalable, RESTful architecture.
- 📱 **Responsive Design** — Optimized for both desktop and mobile devices.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Axios
- Tailwind CSS
- Socket.io (for real-time updates)

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.io

---

## 📦 Getting Started....

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/akash22bcsc05/BOOK_STORE.git
cd BOOK_STORE
```

## Backend Setup (/backend)

cd backend
npm install


## Create a .env file in the /backend folder:

PORT=1000
MONGO_URI=your_mongodb_connection_string

## Start the backend server:

cd/BOOK_STORE/backend
nodemon app.js

## Frontend Setup (/frontend)

cd frontend
npm install

## Start the frontend server:

cd/BOOK_STORE/frontend
npm install
npm run dev
