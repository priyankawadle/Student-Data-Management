
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
- Create a PostgreSQL database with the schema name `student_db`.
- Add your PostgreSQL credentials to the `.env` file.

Use Zip folder to execute project.
If you are using the zip folder directly, follow the steps below to set up the project and ensure everything is running correctly. Make sure you have PostgreSQL installed and running on your local machine.


### Example `.env` File
```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_DATABASE=student_db
DB_PASSWORD=your_postgres_password
DB_PORT=5432
PORT=3001
```

## Steps to Set Up the Project

### 1. Create the Database Tables
Run the `createTables.js` script to create the necessary tables in the database:
```bash
cd Backend
node createTables.js
```

### 2. Start the Frontend and Backend Server
Execute the following command in the root directory to start both the frontend and backend server:
```bash
npm start
```
It will redirect you on broswer http://localhost:3000/ .
You can perform CRUD operations for student data management.

### No need to install packages zip folder already contains node_modules 
---
