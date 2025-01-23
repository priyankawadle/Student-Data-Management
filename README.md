
# Student Data Management Application

This repository contains both the backend (Node.js) and frontend (React.js) applications for managing student data.

## Features
- Add, edit, view and delete student records.
- View and update subjects and marks for each student.
- Pagination for student records.
- Fully responsive frontend using React Bootstrap.
- SweetAlert2 integration for user-friendly modals and alerts.

## Project Structure
```
/Student-Data-Management
  /Backend
  /frontend
```

## Prerequisites
Make sure you have the following installed on your system:
- Node.js (>= 14.x, used 22.12.0 version )
- npm (Node Package Manager)
- PostgreSQL (Database , use pgadmin for revewing db changes )

## Steps to Set Up the Application

### Database Setup
1. Install PostgreSQL and pgAdmin :

2. Create a database for the application:
   - Open pgAdmin or your PostgreSQL CLI.
   - Run the following command to create a new database:
     ```sql
     CREATE DATABASE student_db;
     ```

### Backend Setup

1. Navigate to the `Backend` folder:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend` folder with the following content:
   ```env
   DB_USER=your_database_user
   DB_HOST=localhost
   DB_DATABASE=student_db
   DB_PASSWORD=your_database_password
   DB_PORT=5432
   PORT=3001
   ```

4. Run the script to create tables and insert default data:
   ```bash
   node createTables.js
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

   By default, the server runs at [http://localhost:3001](http://localhost:3001).
   After successfull execution of Backend repo you can execute apis given in postman export file.

### Frontend Setup

1. Navigate to the `Frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend server:
   ```bash
   npm start
   ```

   By default, the application runs at [http://localhost:3000](http://localhost:3000).

### Root-Level Setup

For root-level dependencies (if any), run the following command in the root directory:
```bash
npm install
```

#### After successfull script execution , package installation on Backend , frontend and root folder now Start the frontend & backend server together:
   ```bash
   npm start
   ```
It will redirect you on broswer http://localhost:3000/ .
You can perform CRUD operations for student data management.
---
