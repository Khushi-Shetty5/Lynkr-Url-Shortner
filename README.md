# 🔗 URL Shortener with Analytics & Admin Dashboard

## 📌 Overview

This is a full-stack URL Shortener web application built using Node.js, Express, and EJS.  
The application allows users to generate short URLs, track click analytics, and provides an admin dashboard to monitor all generated links.

The project follows a server-side rendering architecture where the backend handles routing, business logic, database operations, and dynamic page rendering using EJS templates.

---

## 🚀 Features

### 👤 User Features
- Generate short URL from a long URL
- Automatic redirection to the original link
- Track number of clicks for each short URL
- View analytics page in tabular format

### 📊 Analytics
- Displays:
  - Short ID
  - Original URL
  - Number of clicks
  - Associated user information

### 🔐 Admin Dashboard
- View all generated short URLs
- See associated User IDs
- Monitor system-wide URL usage
- Centralized control panel for link tracking

---

## 🛠 Tech Stack

- Backend: Node.js
- Framework: Express.js
- Templating Engine: EJS
- Database: MongoDB
- Styling: CSS 

---

## 🏗 Architecture

Browser → Express Server → EJS Templates → Rendered HTML

The backend handles:
- Short URL generation
- Database storage
- Click tracking logic
- Redirection handling
- Admin data retrieval

---

## ⚙ How It Works

1. User submits a long URL.
2. Server generates a unique short ID.
3. The short ID and original URL are stored in the database.
4. When a short URL is accessed:
   - The server searches for the matching short ID.
   - Click count is incremented.
   - User is redirected to the original URL.
5. Analytics data is displayed in a table format using dynamic EJS rendering.

---

## 💻 Installation & Setup

### 1️⃣ Clone the Repository

git clone <your-repository-link>

### 2️⃣ Install Dependencies

npm install

### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add:

PORT=5000
DATABASE_URL=your_database_connection_string

### 4️⃣ Run the Application

npm start

Open in browser:
http://localhost:5000

---

## 📂 Project Structure

project/
│
├── views/        # EJS templates
├── public/       # Static files (CSS, JS)
├── routes/       # Application routes
├── models/       # Database models
├── app.js        # Main server file
└── package.json

---

## 📈 Future Improvements

- User authentication & role-based access
- Custom short URLs
- Link expiration feature
- Deployment to cloud platform
- Improved UI/UX
