# 🎒 CampusVault

**Live Demo:** [https://campus-vault-eight.vercel.app](https://campus-vault-eight.vercel.app)

CampusVault is a peer-to-peer marketplace designed exclusively for university students. It provides a secure, localized platform for students to list, rent, and share campus gear—ranging from engineering kits and textbooks to dorm essentials and electronics. 

Built with a bold, high-contrast **Neobrutalist UI**, the platform prioritizes clear interactions, trust-building features, and a seamless booking workflow.

---

## ✨ Key Features

- **Peer-to-Peer Rentals**: Students can easily list their unused gear or rent items they need for short-term projects.
- **Bold Neobrutalist Design**: A unique, striking user interface featuring hard shadows, thick borders, and vibrant colors (using Tailwind CSS).
- **Secure Authentication**: JWT-based session management protecting user data, profiles, and active rentals.
- **Booking & Conflict Management**: Intelligent date-checking prevents users from double-booking items and handles overlapping request validations.
- **Trust Scores & Verified Hosts**: Built-in reputation metrics to ensure a safe and reliable marketplace environment.
- **Admin Dashboard**: Specialized access for administrators to monitor the platform, moderate listings, and suspend rule-breaking users.
- **"My Vault" Dashboard**: A centralized hub for users to track their active rentals, manage their listings, and edit their profiles.

---

## 🛠️ Technologies Used

### Frontend
- **React.js (v18)** - Component-based UI architecture.
- **Vite** - Lightning-fast build tool and development server.
- **Tailwind CSS (v3)** - Utility-first styling utilized heavily for custom Neobrutalist design tokens.
- **React Router DOM (v6)** - Client-side routing with protected route middleware.
- **Lucide React** - Clean, modern iconography.
- **Axios** - Interceptor-configured HTTP client for API communication.

### Backend
- **Node.js & Express.js** - Robust server framework utilizing Hexagonal/Clean Architecture principles.
- **MongoDB & Mongoose** - NoSQL database for flexible data modeling of users, listings, and bookings.
- **JWT (JSON Web Tokens)** - Secure stateless authentication via HttpOnly cookies.
- **Bcrypt** - Password hashing and security.
- **Multer** - Multipart/form-data handling for local avatar uploads.

---

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/) installed on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/turab1020/CampusVault.git
cd CampusVault
```

### 2. Setup the Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/campusvault
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal window:
```bash
cd frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend development server:
```bash
npm run dev
```

### 4. Visit the Application
Open your browser and navigate to `http://localhost:5173`.
