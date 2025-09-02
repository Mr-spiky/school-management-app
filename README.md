# School Management App 🏫

A full-stack Next.js application with MySQL for managing school data. Features form validation, image uploads, and responsive design.

## 🌐 Live Demo
**Vercel Deployment**: [https://school-management-app.vercel.app](https://school-management-app.vercel.app)

## ✨ Features
- Add schools with form validation
- View schools in responsive grid layout
- Image upload to local storage
- MySQL database integration
- Mobile-friendly design

## 🛠️ Tech Stack
- Next.js 14 (App Router)
- Tailwind CSS
- MySQL
- React Hook Form

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/YOUR_USERNAME/school-management-app.git
   cd school-management-app
   npm install
2.**Setup Databses**
```bash
CREATE DATABASE school_management;
USE school_management;
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact BIGINT NOT NULL,
  image TEXT NOT NULL,
  email_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
3.**Environment Variables (.env.local)**
```
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=school_management
```
4.Run Development Server
```bash
npm run dev
```
#📁 Project Structure#

app/
├── add-school/page.js          # School form
├── show-schools/page.js        # Schools display
├── api/schools/route.js        # API endpoint
lib/database.js                 # DB connection
public/schoolImages/            # Image storage
