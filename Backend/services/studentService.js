const pool = require('../config/db');

/**
 * Retrieve all students with pagination.
 */
const getAllStudents = async (page, limit) => {
  const offset = (page - 1) * limit;

  // Query to count total students
  const totalQuery = 'SELECT COUNT(*) FROM students';

  // Query to retrieve students
  const studentQuery = `
    SELECT id, name, email, age, created_at
    FROM students
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;

  // Query to retrieve marks and subjects for all students
  const marksQuery = `
    SELECT m.student_id, sub.name AS subject, sub.id AS subject_id, m.mark
    FROM marks m
    INNER JOIN subjects sub ON m.subject_id = sub.id
  `;

  const totalRecords = parseInt((await pool.query(totalQuery)).rows[0].count, 10);
  const students = (await pool.query(studentQuery, [limit, offset])).rows;
  const marks = (await pool.query(marksQuery)).rows;

  // Attach marks to their respective students
  students.forEach((student) => {
    student.marks = marks
      .filter((mark) => mark.student_id === student.id)
      .map((mark) => ({ subject: mark.subject, subject_id: mark.subject_id,mark: mark.mark }));
  });

  return { totalRecords, students };
};

/**
 * Retrieve a student by ID with their marks.
 */
const getStudentById = async (id) => {
  // Query to fetch the student's details
  const studentQuery = 'SELECT * FROM students WHERE id = $1';

  // Query to fetch marks and their associated subjects
  const marksQuery = `
    SELECT sub.name AS subject, m.mark
    FROM marks m
    INNER JOIN subjects sub ON m.subject_id = sub.id
    WHERE m.student_id = $1
  `;

  const student = (await pool.query(studentQuery, [id])).rows[0];
  if (!student) return null;

  const marks = (await pool.query(marksQuery, [id])).rows;
  return { ...student, marks };
};

/**
 * Create a new student.
 */
const createStudent = async ({ name, email, age, subject_marks }) => {
  try {
    // Begin transaction
    await pool.query('BEGIN');

    // Insert the student into the students table
    const studentQuery = `
      INSERT INTO students (name, email, age) 
      VALUES ($1, $2, $3) RETURNING *
    `;
    const studentValues = [name, email, age];
    const studentResult = await pool.query(studentQuery, studentValues);
    const student = studentResult.rows[0];

    // Insert marks into the marks table
    const markQuery = `
      INSERT INTO marks (student_id, subject_id, mark) 
      VALUES ($1, $2, $3)
    `;
    for (const { subject_id, mark } of subject_marks) {
      await pool.query(markQuery, [student.id, subject_id, mark]);
    }

    // Commit transaction
    await pool.query('COMMIT');
    return student;
  } catch (error) {
    // Rollback transaction in case of error
    await pool.query('ROLLBACK');
    throw error;
  }
};

/**
 * Update a student by ID.
 */
const updateStudent = async (id, { name, email, age, subject_marks }) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Update student details
    const fields = [];
    const values = [];
    let query = 'UPDATE students SET ';

    if (name) {
      fields.push(`name = $${fields.length + 1}`);
      values.push(name);
    }
    if (email) {
      fields.push(`email = $${fields.length + 1}`);
      values.push(email);
    }
    if (age) {
      fields.push(`age = $${fields.length + 1}`);
      values.push(age);
    }

    if (fields.length > 0) {
      query += fields.join(', ') + ` WHERE id = $${fields.length + 1} RETURNING *`;
      values.push(id);

      const studentResult = await client.query(query, values);
      if (!studentResult.rows.length) {
        throw new Error('Student not found');
      }
    }

    // Update or insert marks if subject_marks is provided
    if (subject_marks && Array.isArray(subject_marks)) {
      for (const { subject_id, mark } of subject_marks) {
        const markQuery = `
          INSERT INTO marks (student_id, subject_id, mark) 
          VALUES ($1, $2, $3)
          ON CONFLICT (student_id, subject_id) 
          DO UPDATE SET mark = EXCLUDED.mark
        `;
        await client.query(markQuery, [id, subject_id, mark]);
      }
    }

    await client.query('COMMIT');
    return { id, name, email, age, subject_marks };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

/**
 * Delete a student by ID.
 */
const deleteStudent = async (id) => {

  try {
    await pool.query('BEGIN');

    // Delete marks associated with the student
    const deleteMarksQuery = 'DELETE FROM marks WHERE student_id = $1';
    await pool.query(deleteMarksQuery, [id]);

    // Delete the student
    const deleteStudentQuery = 'DELETE FROM students WHERE id = $1';
    const result = await pool.query(deleteStudentQuery, [id]);

    await pool.query('COMMIT');
    return result.rowCount > 0; // Returns true if the student was deleted
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};