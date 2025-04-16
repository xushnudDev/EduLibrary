# 📚 E-Library Management System

A modern, scalable digital library management system for handling books, users, borrowing activities, reviews, and categories. Built for both students and admins to manage books efficiently online.

---

## ✨ Features

- 👤 User Registration, Login & Role Management
- 🔐 Role-based Access (User / Admin)
- 📖 Book Management with Categories
- 📥 Borrow & Return Books with Due Dates
- 📝 Review System with Ratings & Comments
- 🗂️ Many-to-Many Book-Category System
- 📊 Admin Access to All User Activities

---

## 🧩 Database Schema Overview

Here's a simplified look at the database schema you're using (based on your [DrawSQL diagram](https://drawsql.app/teams/azul-x/diagrams/e-library#)):

### 🔸 `users`
- `id` (serial) – primary key
- `fullname` (varchar)
- `email` (unique)
- `password` (hashed)
- `roles` (varchar) – e.g. `user`, `admin`
- `created_at`, `updated_at`

### 🔸 `books`
- `id` (serial)
- `title`, `author`, `genre` (varchar)
- `published_date` (varchar)
- `description` (varchar)
- `created_at`, `updated_at`

### 🔸 `categories`
- `id` (serial)
- `name` (varchar)
- `created_at`, `updated_at`

### 🔸 `book_category` (📚↔️📂)
- `id` (serial)
- `book_id` (FK to books)
- `category_id` (FK to categories)
- `created_at`

> **Many-to-Many** relationship: one book can belong to multiple categories.

### 🔸 `borrowing`
- `id` (serial)
- `user_id`, `book_id` (FKs)
- `borrow_at` (timestamp)
- `due_date` (time)
- `returned_at` (nullable)

> Tracks all borrowing history, due dates, and return status.

### 🔸 `reviews`
- `id` (serial)
- `user_id`, `book_id` (FKs)
- `rating` (int)
- `comment` (varchar)
- `created_at`, `updated_at`

---

## ⚙️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (or MySQL) or MONGO DB
- **Auth**: JWT + bcrypt
- **Frontend**: EJS or HBS (optional)
- **Environment**: Docker-ready (optional)

---

