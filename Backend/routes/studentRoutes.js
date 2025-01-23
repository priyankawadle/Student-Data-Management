const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

// Route to create a new student
router.post('/', studentController.createStudent);

// Route to get all students with pagination
router.get('/', studentController.getStudents);

// Route to get a single student by ID with marks
router.get('/:id', studentController.getStudentById);

// Route to update a student by ID
router.put('/:id', studentController.updateStudent);

// Route to delete a student by ID
router.delete('/:id', studentController.deleteStudent);

module.exports = router;