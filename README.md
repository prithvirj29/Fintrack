# 💰 Finance Tracker

A full-stack Personal Finance Tracker built using **React.js**, **Spring Boot**, **Spring Security (JWT)**, and **MySQL**. The application allows users to securely manage their income and expenses while providing financial insights through an interactive dashboard.

---

## 🚀 Live Demo

Frontend: https://my-finance-trackerl.vercel.app/

> Backend is built using Spring Boot REST APIs.

---

# 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Secure API Access

### 📊 Dashboard
- Total Income
- Total Expense
- Current Balance
- Financial Summary Cards
- Interactive Charts

### 💵 Transaction Management
- Add Transactions
- View Transactions
- Edit Transactions
- Delete Transactions
- Search Transactions

### 📱 Responsive UI
- Modern Login Page
- Responsive Dashboard
- Clean Table Layout
- Mobile Friendly Design

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Chart.js
- CSS3

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT Authentication
- Maven

## Database

- MySQL

## Deployment

- Vercel (Frontend)
- GitHub

---

# 🏗 Project Architecture

```
React Frontend
        │
        ▼
REST API (Axios)
        │
        ▼
Spring Boot Controllers
        │
        ▼
Service Layer
        │
        ▼
Repository Layer (JPA)
        │
        ▼
Hibernate
        │
        ▼
MySQL Database
```

---

# 📂 Project Structure

```
Finance-Tracker
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── security
│   ├── entity
│   ├── dto
│   ├── config
│   └── pom.xml
│
└── README.md
```

---

# 🔑 Authentication Flow

```
Register
      │
      ▼
User Saved in MySQL
      │
      ▼
Login
      │
      ▼
JWT Generated
      │
      ▼
JWT Stored in Browser
      │
      ▼
Authenticated API Requests
```

---

# 🔄 CRUD Flow

### Add Transaction

```
React Form
      │
POST /transactions
      │
Controller
      │
Service
      │
Repository
      │
MySQL
```

### View Transactions

```
React
      │
GET /transactions
      │
Spring Boot
      │
MySQL
      │
React Table
```

### Update Transaction

```
Edit Button
      │
PUT /transactions/{id}
      │
Database Updated
      │
UI Refreshed
```

### Delete Transaction

```
Delete Button
      │
DELETE /transactions/{id}
      │
Database Updated
      │
Table Refreshed
```

---

# 🗄 Database Schema

## User

| Field | Type |
|-------|------|
| id | Long |
| name | String |
| email | String |
| password | String |

---

## Transaction

| Field | Type |
|-------|------|
| id | Long |
| title | String |
| amount | Double |
| type | Enum |
| category | Enum |
| date | LocalDate |
| description | String |

Relationship

```
User (1)
   │
   │ One-To-Many
   ▼
Transactions (Many)
```

---

# 🔐 Security

- Spring Security
- JWT Authentication
- Protected REST APIs
- Stateless Authentication
- Password Encryption

---

# ⚙ API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

## Transactions

```
GET /api/transactions

POST /api/transactions

PUT /api/transactions/{id}

DELETE /api/transactions/{id}
```

---

# 📷 Screenshots

- Login Page
- Register Page
- Dashboard
- Charts
- Transaction Table

(Add screenshots here)

---

# 📈 Future Improvements

- Monthly Budget Planning
- CSV Export
- PDF Report Generation
- Dark Mode
- Email Notifications
- Advanced Analytics
- Recurring Transactions

---

# ▶ Running Locally

## Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on

```
http://localhost:8080
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 👨‍💻 Author

**Rohan Kodagali**

GitHub:
https://github.com/rohan142003

---

## ⭐ If you like this project, don't forget to star the repository!
