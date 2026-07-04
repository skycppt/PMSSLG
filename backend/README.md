# 📚 Publication Management System (PMS)

A full-stack Publication Management System developed for the **Sant Nirankari Publication Centre** to manage books, publications, subscriptions, inventory, sales, invoices, and analytics.

The system provides secure authentication, role-based access control, inventory tracking, automatic invoice generation, subscription management, and an analytics dashboard.

---

# 🚀 Features

- User Authentication (JWT)
- Role-Based Access Control (Admin, Staff, Member)
- Book Management
- Publication Management
- Subscription Management
- Subscription Renewal
- Payment History
- Book Sales
- Automatic Invoice Generation
- Inventory Management
- Stock History
- Dashboard Analytics
- Swagger API Documentation

---

# 🛠 Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## Authentication

- JWT (JSON Web Token)
- bcryptjs

## API Documentation

- Swagger UI
- Swagger JSDoc

## Middleware

- Helmet
- Compression
- Morgan
- CORS
- Express Rate Limit

---

# 📂 Project Structure

```
backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── validators/
│   ├── utils/
│   └── server.js
│
├── package.json
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

# 💻 Local Setup

Clone the repository

```bash
git clone https://github.com/skycppt/PMSSLG.git
```

Go to the backend folder

```bash
cd PMSSLG/backend
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add your environment variables.

Run the development server

```bash
npm run dev
```

Server will start on

```
http://localhost:5000
```

---

# 🌐 Deployed Backend

Render Deployment

```
https://YOUR_RENDER_BACKEND_URL.onrender.com
```

Replace the above URL with your actual deployed Render URL.

---

# 📖 API Documentation

Swagger Documentation

```
https://YOUR_RENDER_BACKEND_URL.onrender.com/api-docs
```

Local Swagger

```
http://localhost:5000/api-docs
```

---

# 🔐 User Roles

### Admin

- Manage Books
- Manage Publications
- Manage Inventory
- Manage Sales
- View Dashboard
- Generate Invoices

### Staff

- Book Sales
- Inventory Operations

### Member

- View Subscriptions
- Renew Subscription
- Payment History

---

# 📊 Dashboard

The backend provides dashboard analytics including:

- Total Books
- Total Publications
- Active Subscriptions
- Total Revenue
- Today's Sales
- Monthly Revenue
- Recent Sales
- Best Selling Books

---

# 👨‍💻 Author

**Sujit Kumar Yadav**

GitHub

https://github.com/skycppt

LinkedIn

(Add your LinkedIn profile here)

---

# 📄 License

This project is developed for educational and academic purposes.


# 📸 Project Screenshots

## Login Page



---

## Dashboard



---

## Book Management



---

## Book Sales



---

## Invoice

