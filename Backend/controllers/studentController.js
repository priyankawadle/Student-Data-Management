const studentService = require('../services/studentService');
const { paginate } = require('../utils/pagination');

/**
 * Retrieve all students with pagination.
 */
const getStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const { totalRecords, students } = await studentService.getAllStudents(page, limit);
    const metadata = paginate(totalRecords, page, limit);

    res.status(200).json({ data: students, metadata });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Retrieve a single student by ID with marks.
 */
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentService.getStudentById(id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create a new student record.
 */
const createStudent = async (req, res) => {
  try {
    const { name, email, age, subject_marks } = req.body;

    // Validate required fields
    if (!name || !email || !age) {
      return res.status(400).json({ message: 'Name, email, and age are required' });
    }

    // Validate subject_marks
    if (!Array.isArray(subject_marks) || subject_marks.length === 0) {
      return res.status(400).json({ message: 'subject_marks is required and must be a non-empty array' });
    }

    // Ensure all subject_marks entries have subject_id and mark as valid numbers
    const isInvalidMarks = subject_marks.some(
      ({ subject_id, mark }) =>
        isNaN(subject_id) || isNaN(mark) || mark < 0 || mark > 100
    );

    if (isInvalidMarks) {
      return res.status(400).json({
        message: 'Each subject_marks entry must contain valid subject_id and mark, and mark must be between 0 and 100',
      });
    }

    // Call service to create student
    const newStudent = await studentService.createStudent({ name, email, age, subject_marks });
    res.status(201).json({ message: 'Student created successfully', data: newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * Update a student record by ID.
 */
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, subject_marks } = req.body;

    // Validate at least one field is provided
    if (!name && !email && !age && (!Array.isArray(subject_marks) || subject_marks.length === 0)) {
      return res.status(400).json({ message: 'At least one field or subject_marks is required to update' });
    }

    // Validate subject_marks if provided
    if (subject_marks) {
      const invalidMarks = subject_marks.some(
        ({ subject_id, mark }) => isNaN(subject_id) || isNaN(mark) || mark < 0 || mark > 100
      );

      if (invalidMarks) {
        return res.status(400).json({
          message: 'Invalid subject_marks: subject_id and mark must be valid numbers, and mark must be between 0 and 100',
        });
      }
    }

    const updatedStudent = await studentService.updateStudent(id, { name, email, age, subject_marks });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully', data: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete a student record by ID.
 */
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await studentService.deleteStudent(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
