const express = require('express');
const subjectController = require('../controllers/subjectController');

const router = express.Router();

// Route to get subjects
router.get('/', subjectController.getSubjects);

module.exports = router;