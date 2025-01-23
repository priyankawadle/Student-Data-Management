const pool = require('../config/db');

/**
 * Create the subjects table.
 */
const createSubjectTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS subjects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE
    );
  `;
  await pool.query(query);
};

/**
 * Insert default subjects into the subjects table.
 */
const insertDefaultSubjects = async () => {
  const subjects = ['Math', 'English', 'Chemistry', 'Physics', 'Electronics'];
  const query = `
    INSERT INTO subjects (name)
    VALUES ($1)
    ON CONFLICT (name) DO NOTHING
  `;

  for (const subject of subjects) {
    await pool.query(query, [subject]);
  }
};

module.exports = { createSubjectTable, insertDefaultSubjects };
