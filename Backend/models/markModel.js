const pool = require('../config/db');

/**
 * Create the marks table with subject_id as a foreign key.
 */
const createMarkTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS marks (
      id SERIAL PRIMARY KEY,
      student_id INTEGER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
      subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
      mark INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_student_subject UNIQUE (student_id, subject_id)
    );
  `;

  await pool.query(query);
};

module.exports = { createMarkTable };
